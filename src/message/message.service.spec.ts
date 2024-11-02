import { Test, TestingModule } from '@nestjs/testing';
import { MessageService } from './message.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MessageEntity } from './entities/message.entity';
import { ProcessedMessageDTO } from './dto/messageList.dto';

describe('MessageService', () => {
  let service: MessageService;
  let repository: Repository<MessageEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MessageService,
        {
          provide: getRepositoryToken(MessageEntity),
          useClass: Repository, // Usando a classe Repository como mock
        },
      ],
    }).compile();

    service = module.get<MessageService>(MessageService);
    repository = module.get<Repository<MessageEntity>>(
      getRepositoryToken(MessageEntity),
    );
  });

  describe('processMessages', () => {
    it('should return an array of processed messages', async () => {
      const mockMessages = [
        {
          data: { worker: 1, message: 'Hello!', interval: 100 },
        },
        {
          data: { worker: 2, message: 'Hi there!', interval: 200 },
        },
      ];

      jest.spyOn(repository, 'find').mockResolvedValue(mockMessages as any);
      const expectedResult: ProcessedMessageDTO[] = [
        {
          worker: 1,
          worker_listened: 0,
          message: 'Hello!',
          message_listened: '',
        },
        {
          worker: 2,
          worker_listened: 1,
          message: 'Hi there!',
          message_listened: 'Hello!',
        },
      ];

      const result = await service.processMessages();
      expect(result).toEqual(expectedResult);
    });
  });
});
