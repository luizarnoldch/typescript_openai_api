import ChatInput from "../model/chat_entity";

export interface ChatRepository {
  CreateChatCompletion(message: ChatInput): Promise<void>;
}
