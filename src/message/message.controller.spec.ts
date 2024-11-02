import { Test, TestingModule } from '@nestjs/testing';
import { MessageController } from './message.controller';
import { MessageService } from './message.service';

describe('MessageController', () => {
  let controller: MessageController;
  let service: MessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MessageController],
      providers: [
        {
          provide: MessageService,
          useValue: {
            processMessages: jest.fn(), // Mock do método processMessages
          },
        },
      ],
    }).compile();

    controller = module.get<MessageController>(MessageController);
    service = module.get<MessageService>(MessageService);
  });

  describe('getProcessedMessages', () => {
    it('should return an array of processed messages', async () => {
      const result = [
        {
          worker: 1,
          worker_listened: 0,
          message: 'Test message',
          message_listened: '',
        },
      ];

      // Fazendo o mock do método processMessages para retornar o resultado esperado
      jest.spyOn(service, 'processMessages').mockResolvedValue(result);

      expect(await controller.getProcessedMessages()).toBe(result);
      expect(service.processMessages).toHaveBeenCalled(); // Verifica se o método foi chamado
    });
  });
});
