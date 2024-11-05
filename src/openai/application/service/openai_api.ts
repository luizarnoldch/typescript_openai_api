import { ChatCompletionOutput } from "../../domain/repository/openai_types";

export interface OpenAIAPIConsumer {
  ChatCompletion(messages: string): Promise<ChatCompletionOutput>;
}
