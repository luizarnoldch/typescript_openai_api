// Libs
import OpenAI from "openai";

// Types
import {
  ChatCompletionInput,
  ChatCompletionOutput,
} from "../../domain/repository/openai_types";
import { OpenAIAPI } from "../../domain/repository/openai_api";

export default class ClientOpenAIAPI implements OpenAIAPI {
  private openAIClient: OpenAI;

  constructor(openAIApiKey: string) {
    this.openAIClient = new OpenAI({
      apiKey: openAIApiKey,
    });
  }

  public async ChatCompletion(messages: string): Promise<ChatCompletionOutput> {
    const input: ChatCompletionInput = {
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: messages },
      ],
    };

    const response = await this.openAIClient.chat.completions.create(input);

    return response;
  }
}
