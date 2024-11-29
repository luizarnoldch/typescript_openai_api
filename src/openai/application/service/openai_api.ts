import { ChatCompletionOutput, ModelsOutput } from "../../domain/model/openai_types";

export interface OpenAIAPIConsumer {
  // Chat
  ChatCompletion(messages: string): Promise<ChatCompletionOutput>;
  ChatCompletionStream(messages: string): Promise<ChatCompletionOutput>;

  // Models
  ListModels(): Promise<ModelsOutput>;
}
