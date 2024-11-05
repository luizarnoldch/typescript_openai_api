export default class ChatEntity {
  private ChatID: string;
  private ChatMessage: string;
  private ChatModel: string;
  private CreatedAt: Date;

  constructor(
    chatID: string,
    chatMessage: string,
    chatModel: string,
    createdAt?: Date
  ) {
    this.ChatID = chatID;
    this.ChatMessage = chatMessage;
    this.ChatModel = chatModel;
    this.CreatedAt = createdAt || new Date(); // Si no se proporciona una fecha, toma la fecha actual
  }

  // Método para obtener un formato de fecha legible
  getFormattedDate(): string {
    return this.CreatedAt.toISOString();
  }

  // Getters
  getChatID(): string {
    return this.ChatID;
  }

  getChatMessage(): string {
    return this.ChatMessage;
  }

  getChatModel(): string {
    return this.ChatModel;
  }

  getCreatedAt(): Date {
    return this.CreatedAt;
  }
}
