import { Injectable } from '@nestjs/common';
import { MessageEntity } from './entities/message.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProcessedMessageDTO } from './dto/messageList.dto';

@Injectable()
export class MessageService {
  private lastMessageContent = ''; // Armazena a última mensagem recebida
  private lastWorker = 0; // Armazena o último worker que falou

  constructor(
    @InjectRepository(MessageEntity)
    private readonly messageRepository: Repository<MessageEntity>,
  ) {}

  async processMessages(): Promise<ProcessedMessageDTO[]> {
    try {
      const messages = await this.messageRepository.find();
      if (messages.length === 0) {
        throw new Error('The messages list is empty');
      }

      // Ordena as mensagens pelo campo interval que está no JSON data
      const orderedMessages = messages
        .map((message) => {
          return { ...message.data, originalMessage: message };
        })
        .sort((a, b) => a.interval - b.interval); // Ordenação pelo campo interval

      // Lista para armazenar o resultado formatado
      const result: ProcessedMessageDTO[] = [];

      // Processa e formata cada mensagem
      for (const messageData of orderedMessages) {
        result.push({
          worker: messageData.worker,
          worker_listened: this.lastWorker,
          message: messageData.message,
          message_listened: this.lastMessageContent,
        });

        // Atualiza os dados para o próximo loop
        this.lastWorker = messageData.worker;
        this.lastMessageContent = messageData.message;

        // Aguarda o intervalo de tempo antes de processar a próxima mensagem,
        // para simular a espera entre mensagens, emulando concorrência.
        await this.delay(messageData.interval);
      }

      return result;
    } catch (error) {
      return error.message;
    }
  }

  // Função auxiliar para aguardar o intervalo de tempo
  private delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
