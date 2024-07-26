import { Test, TestingModule } from "@nestjs/testing";
import { LogsService } from "./logs.service";
import { getModelToken } from "@nestjs/mongoose";
import { Logs } from "../entities/log-entity";
import { Model } from "mongoose";


describe('logsService', () => {
    let service: LogsService; 
    let model: Model<Logs>

    const mockLog = {
        _id: "Id",
        message: "This is a message",
        createdAt: new Date(),
    }

    const logsArray = [mockLog]

    const mockLogsModel = {
        find: jest.fn().mockResolvedValue(logsArray),
        findById: jest.fn().mockResolvedValue(mockLog),
      };
    

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                LogsService,
                {
                    provide: getModelToken(Logs.name),
                    useValue: mockLogsModel
                }
            ]
        }).compile()

        
        service = module.get<LogsService>(LogsService)
        model = module.get<Model<Logs>>(getModelToken(Logs.name))
    }) 

    it('Should be defined', () => {
        expect(service).toBeDefined();
    })

    it('Should return a log by ID', async () => {
        const log = await service.getTipById('someId')
        expect(log).toEqual(mockLog)
        expect(model.findById).toHaveBeenCalledWith('someId')
    })
})

