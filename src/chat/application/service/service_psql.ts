// Interface
import { ChatService } from "./service";
import { ChatRepository } from "../../domain/repository/chat_repository";
import ChatInput from "../../domain/model/chat_entity";

export default class ChatServicePSQL implements ChatService {
  private repository: ChatRepository;

  constructor(repository: ChatRepository) {
    this.repository = repository;
  }

  public async CreateChatCompletion(message: ChatInput): Promise<void> {
    this.repository.CreateChatCompletion(message);
  }
}
