import { Logs } from '../../../common/entities/log-entity';
import { TelegramBotService } from "./telegram-bot.service"
import { Model } from "mongoose"
import { TestingModule } from "@nestjs/testing"
import { Test } from "@nestjs/testing"
import { ConfigService } from "@nestjs/config"
import { getModelToken } from "@nestjs/mongoose"
import * as dotenv from 'dotenv'
import { TipDto } from 'src/common/dtos/tipDto';
import axios from 'axios'
import { InternalServerErrorException } from '@nestjs/common';

dotenv.config()

jest.mock('axios')
jest.mock('node-telegram-bot-api')

describe('TelegramBotService', () => {

    let service: TelegramBotService
    let model: Model<Logs>

    const mockConfigService = {
        get: jest.fn().mockReturnValue('mocked-token')
    }

    class MockLogsModel {
        constructor(private data: any){}
        save = jest.fn().mockResolvedValue(this.data)
    }

    const mockLogsModelInstance = new MockLogsModel({});
    const mockLogsModel = jest.fn().mockImplementation(() => mockLogsModelInstance);

    beforeEach(async() => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                TelegramBotService,
                {provide: ConfigService, useValue: mockConfigService},
                {provide: getModelToken(Logs.name), useValue: MockLogsModel}
            ]
        }).compile();
        
        service = module.get<TelegramBotService>(TelegramBotService)
        model = module.get<Model<Logs>>(getModelToken(Logs.name))
    })

    afterEach(() => {
        jest.clearAllMocks()
    })

    describe('onModuleInit', () => {
      
        it('Should throw error if the token is undefined', () => {
            if(process.env.TELEGRAM_BOT_TOKEN = undefined) throw new Error('Telegram bot token is not defined')
            
        })

         it('Should initialize the bot with the correct token bot', () => {
            process.env.TELEGRAM_BOT_TOKEN = 'mocked-token';
            service.onModuleInit()
            expect(service['bot']).toBeDefined();  
       
        })
    }); 

    describe('formatTipMessage', () => {
        it('Should return the correct message in spanish', () => {
            const tipDto: TipDto = {
                img_url: 'http://example.com/image.png',
                title: 'Cómo usar Docker',
                body: 'Aquí hay un consejo rápido sobre cómo usar Docker de manera efectiva...',
                link: 'http://example.com/docker-guide',
                level: 'Junior',
                lang: 'spanish',
                technology: 'Docker',
                subtechnology: 'Docker',
                channelId: '123456789',
                channelType: 'telegram',
            };

            expect(() => service.formatTipMessage(tipDto))
        })
    
        it('Should return the correct message in english', () => {
            const tipDto: TipDto = {
                img_url: 'http://example.com/image.png',
                title: 'How to use Docker',
                body: 'Here is a quick tip on using Docker effectively...',
                link: 'http://example.com/docker-guide',
                level: 'Junior',
                lang: 'english',
                technology: 'Docker',
                subtechnology: 'Docker',
                channelId: '123456789',
                channelType: 'telegram',
            };

            expect(() => service.formatTipMessage(tipDto))
        })
    
        it('Should throw error for unknown language', () => {
            const tipDto: TipDto = {
                img_url: 'http://example.com/image.png',
                title: 'How to use Docker',
                body: 'Here is a quick tip on using Docker effectively...',
                link: 'http://example.com/docker-guide',
                level: 'Junior',
                lang: 'french',
                technology: 'Docker',
                subtechnology: 'Docker',
                channelId: '123456789',
                channelType: 'telegram',
            };

            expect(() => service.formatTipMessage(tipDto));
        })
    });

    describe('getTip', () => {


        const tipDto: TipDto = {
            img_url: 'http://example.com/image.png',
            title: 'How to use Docker',
            body: 'Here is a quick tip on using Docker effectively...',
            link: 'http://example.com/docker-guide',
            level: 'Junior',
            lang: 'english',
            technology: 'Docker',
            subtechnology: 'Docker',
            channelId: '123456789',
            channelType: 'telegram',
          };

        it('Should call formatTipMessage with the correct param', async () => {

            const formatTipMessageSpy = jest.spyOn<any, string>(service as any, 'formatTipMessage').mockReturnValue('formatted message');
            jest.spyOn(service, 'saveTipToDatabase').mockResolvedValue({} as any)
            await service.getTip(tipDto)

            expect(formatTipMessageSpy).toHaveBeenCalledWith(tipDto)
        })

        it('Should call axios.post with the correct parameters', async () => {
            jest.spyOn(service as any, 'formatTipMessage').mockReturnValue('formatted message');
            jest.spyOn(service, 'saveTipToDatabase').mockResolvedValue({} as any);
            (axios.post as jest.Mock).mockResolvedValue({data: 'mocked data'})
        
            await service.getTip(tipDto)

            expect(axios.post).toHaveBeenCalledWith(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
                {
                    chat_id: tipDto.channelId,
                    text: 'formatted message',
                    parse_mode: 'HTML',
                }
            )
        })

        it('Should call saveTipToDatabase with the correct param', async () => {
            jest.spyOn(service as any, 'formatTipMessage').mockReturnValue('formatted message');
            const saveTipToDatabaseSpy = jest.spyOn(service, 'saveTipToDatabase').mockResolvedValue({} as any);
            (axios.post as jest.Mock).mockResolvedValue({data: "Mocked data"})

            await service.getTip(tipDto)
            
            expect(saveTipToDatabaseSpy).toHaveBeenCalledWith(tipDto)

        })

        it('Should throw error when the axios.post fails', async () => {
            jest.spyOn(service, 'formatTipMessage').mockReturnValue('formatted message');
            (axios.post as jest.Mock).mockResolvedValue({} as any);
            jest.spyOn(service, 'saveTipToDatabase').mockRejectedValue(new Error('Axios fails, Database save fail'))

            await expect(service.getTip(tipDto)).rejects.toThrow('Failed to send tip. Please try again later.')
        })

        it('Should throw an InternalServerException ', async () => {
            jest.spyOn(service, 'formatTipMessage').mockReturnValue('formatted message');
            (axios.post as jest.Mock).mockResolvedValue({data: "mocked data"});
            jest.spyOn(service, 'saveTipToDatabase').mockRejectedValue(new InternalServerErrorException('Internal server exception, Database save fail'));

            await expect(service.getTip(tipDto)).rejects.toThrow(InternalServerErrorException);
        })
    })

    
})



