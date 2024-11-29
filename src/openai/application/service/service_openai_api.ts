// Types
import { OpenAIAPI } from "../../domain/repository/openai_api";
import {
  ChatCompletionOutput,
  ModelsOutput,
} from "../../domain/model/openai_types";

// Interface
import { OpenAIAPIConsumer } from "./openai_api";

export default class ServiceOpenAIAPIConsumer implements OpenAIAPIConsumer {
  private client: OpenAIAPI;

  constructor(client: OpenAIAPI) {
    this.client = client;
  }

  public async ChatCompletion(messages: string): Promise<ChatCompletionOutput> {
    return this.client.ChatCompletion(messages);
  }

  public async ChatCompletionStream(
    messages: string
  ): Promise<ChatCompletionOutput> {
    return this.client.ChatCompletionStream(messages);
  }

  public async ListModels(): Promise<ModelsOutput> {
    return this.client.ListModels();
  }
}
