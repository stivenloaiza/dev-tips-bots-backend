import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const apiKey = request.headers['api-key'];

    if (!apiKey) {
      throw new UnauthorizedException('API key is missing');
    }

    return true;

    // try {
    //   const response = await axios.post('URL_DEL_MICROSERVICIO', { apiKey });

    //   if (response.data.status === 'OK') {

    //   } else {
    //     throw new UnauthorizedException('Invalid API key');
    //   }
    // } catch (error) {
    //   throw new UnauthorizedException('Error validating API key');
    // }
  }
}
