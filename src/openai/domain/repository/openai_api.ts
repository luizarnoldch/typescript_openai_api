import { ChatCompletionOutput, ModelsOutput } from "../model/openai_types";

export interface OpenAIAPI {
  // Chat
  ChatCompletion(messages: string): Promise<ChatCompletionOutput>;
  ChatCompletionStream(messages: string): Promise<ChatCompletionOutput>;

  // Models
  ListModels(): Promise<ModelsOutput>;
}
