import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { MessageEntity } from '../message/entities/message.entity';

@Injectable()
export class DbConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createTypeOrmOptions(connectionName?: string): TypeOrmModuleOptions {
    return {
      type: 'sqlite',
      database: this.configService.get<string>('DATABASE_PATH'),
      entities: [MessageEntity],
      synchronize: false,
    };
  }
}
