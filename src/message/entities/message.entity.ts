import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('messages_table')
export class MessageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('json')
  data: {
    worker: number;
    message: string;
    interval: number;
    destination_worker: number;
  };
}
