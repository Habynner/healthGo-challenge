export class ProcessedMessageDTO {
  constructor(
    readonly worker: number,
    readonly worker_listened: number,
    readonly message: string,
    readonly message_listened: string,
  ) {}
}
