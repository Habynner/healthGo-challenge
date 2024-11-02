import { Controller, Get } from '@nestjs/common';
import { MessageService } from './message.service';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('process')
  async getProcessedMessages() {
    const messages = await this.messageService.processMessages();
    return messages;
  }
}
