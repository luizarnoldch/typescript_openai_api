import { ChatCompletionOutput } from "./openai_types";

export interface OpenAIAPI {
  ChatCompletion(messages: string): Promise<ChatCompletionOutput>;
}
