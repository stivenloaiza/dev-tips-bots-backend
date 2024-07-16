import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';


@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['apikey'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    try {
      const response = await lastValueFrom(
        this.httpService.post(process.env.AUTH_URL, { apiKey })
      );

      if (response) {
        return true;
      } else {
        throw new UnauthorizedException('Invalid API key format');
      }
    } catch (error) {
      throw new UnauthorizedException('Error validating API key');
    }
  }
}
