import { Test, TestingModule } from "@nestjs/testing";
import { DiscordService } from "./discord-bot.service";
import { getModelToken } from "@nestjs/mongoose";
import { Logs } from "../../../common/entities/log-entity";
import { messages } from "../../../common/messages/messagesLangDiscord";
import { NotFoundException } from "@nestjs/common";

describe("DiscordService", () => {
  let service: DiscordService;
  let logsModel: any; 

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DiscordService,
        {
          provide: getModelToken(Logs.name),
          useValue: {
            findById: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<DiscordService>(DiscordService);
    logsModel = module.get(getModelToken(Logs.name));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("getTipById", () => {
    it("should return a tip by ID", async () => {
      const mockTip = {
        _id: "mock_id",
        title: "Mock Tip",
        body: "This is a mock tip for testing.",
        img_url: "http://example.com/image.png",
        link: "http://example.com/docker-guide",
        level: "Junior",
        lang: "English",
        technology: "Docker",
        subtechnology: "Docker Compose",
        channelId: "123456789",
        channelType: "discord",
        createdAt: new Date(),
      };

      (logsModel.findById as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockTip),
      });

      const result = await service.getTipById("mock_id");

      expect(result).toEqual(mockTip);
    });

    it("should throw NotFoundException if tip is not found", async () => {
      (logsModel.findById as jest.Mock).mockReturnValue({
        exec: jest.fn().mockResolvedValue(null),
      });

      await expect(service.getTipById("non_existing_id")).rejects.toThrowError(
        NotFoundException
      );
    });
  });

  describe("formatTipMessage", () => {
    it("should return a Spanish message when tip language is Spanish", () => {
      const tip = { lang: "Spanish" } as any; // Mock tip
      jest.spyOn(messages, "spanish").mockReturnValue("Mensaje en español");

      const result = service.formatTipMessage(tip);

      expect(result).toBe("Mensaje en español");
      expect(messages.spanish).toHaveBeenCalledWith(tip);
    });

    it("should return an English message when tip language is English", () => {
      const tip = { lang: "English" } as any;
      jest.spyOn(messages, "english").mockReturnValue("Message in English");

      const result = service.formatTipMessage(tip);

      expect(result).toBe("Message in English");
      expect(messages.english).toHaveBeenCalledWith(tip);
    });

    it("should return an unsupported language message for other languages", () => {
      const tip = { lang: "French" } as any;
      jest
        .spyOn(messages, "unsupported")
        .mockReturnValue("Unsupported language");

      const result = service.formatTipMessage(tip);

      expect(result).toBe("Unsupported language");
      expect(messages.unsupported).toHaveBeenCalledWith(tip);
    });
  });
});
