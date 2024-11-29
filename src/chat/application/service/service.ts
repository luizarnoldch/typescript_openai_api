import ChatInput from "../../domain/model/chat_entity";

export interface ChatService {
  CreateChatCompletion(message: ChatInput): Promise<void>;
}
