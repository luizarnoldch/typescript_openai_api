// Libs
import OpenAI from "openai";

// Types
import {
  ChatCompletionInput,
  ChatCompletionOutput,
  ModelsOutput,
} from "../../domain/model/openai_types";
import { OpenAIAPI } from "../../domain/repository/openai_api";

export default class ClientOpenAIAPI implements OpenAIAPI {
  private openAIClient: OpenAI;

  constructor(openAIApiKey: string) {
    this.openAIClient = new OpenAI({
      apiKey: openAIApiKey,
    });
  }
  // Chat
  public async ChatCompletion(messages: string): Promise<ChatCompletionOutput> {
    const input: ChatCompletionInput = {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: messages }],
    };

    const response = await this.openAIClient.chat.completions.create(input);

    return response;
  }

  public async ChatCompletionStream(messages: string): Promise<ChatCompletionOutput> {
    const input: ChatCompletionInput = {
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: messages }],
      stream: true as any,
    };

    const response = await this.openAIClient.chat.completions.create(input);

    return response;
  }


  // Models
  public async  ListModels(): Promise<ModelsOutput> {
    const list = await this.openAIClient.models.list();
    return list
  };
}
