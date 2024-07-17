import { Injectable, NotFoundException } from '@nestjs/common';
import { Logs } from '../entities/log-entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class LogsService {
  constructor(@InjectModel(Logs.name) private logsModel: Model<Logs>) {}

  async getAllTips(): Promise<Logs[]> {
    return this.logsModel.find();
  }

  async getTipById(id: string): Promise<Logs> {
    const tip = await this.logsModel.findById(id);
    console.log(tip);

    if (!tip) {
      throw new NotFoundException(`Tip with ID ${id} not found`);
    }
    return tip;
  }
}
