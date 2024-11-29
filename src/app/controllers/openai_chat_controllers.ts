import "dotenv/config";

import { Request, Response } from "express";
import { OpenAIAPIConsumer } from "../../openai/application/service/openai_api";
import ServiceOpenAIAPIConsumer from "../../openai/application/service/service_openai_api";
import { OpenAIAPI } from "../../openai/domain/repository/openai_api";
import ClientOpenAIAPI from "../../openai/infrastructure/adapter/client_openai_api";
import { ChatService } from "../../chat/application/service/service";
import { ChatRepository } from "../../chat/domain/repository/chat_repository";
import ChatRepositoryPSQL from "../../chat/infrastructure/adapter/chat_repository_psql";
import PSQLClientPool from "../../lib/database/psql_pool";
import ChatServicePSQL from "../../chat/application/service/service_psql";
import ChatInput, {
  CompletionTokenDetails,
  PromptTokensDetails,
  Usage,
} from "../../chat/domain/model/chat_entity";

export default class OpenAIChatControllers {
  private infrastructure_openai_api: OpenAIAPI;
  private application_openai_api: OpenAIAPIConsumer;

  private infrastructure_chat_db: ChatService;
  private application_chat_service: ChatRepository;

  constructor() {
    this.infrastructure_openai_api = new ClientOpenAIAPI(
      process.env.OPENAI_API_KEY as string
    );
    this.application_openai_api = new ServiceOpenAIAPIConsumer(
      this.infrastructure_openai_api
    );

    this.infrastructure_chat_db = new ChatRepositoryPSQL(PSQLClientPool);
    this.application_chat_service = new ChatServicePSQL(
      this.infrastructure_chat_db
    );
  }

  public async ChaCompletion(req: Request, res: Response): Promise<Response> {
    const { messages } = req.body;
    try {
      const chatCompletionResponse =
        await this.application_openai_api.ChatCompletion(messages);

      const chatCompletionInput = new ChatInput({
        id: chatCompletionResponse.id,
        object: chatCompletionResponse.object,
        created: chatCompletionResponse.created,
        model: chatCompletionResponse.model,
        choices: chatCompletionResponse.choices,
        usage: new Usage(
          chatCompletionResponse.usage?.prompt_tokens || 0,
          chatCompletionResponse.usage?.completion_tokens || 0,
          chatCompletionResponse.usage?.total_tokens || 0,
          new PromptTokensDetails(
            chatCompletionResponse.usage?.prompt_tokens_details
              ?.cached_tokens || 0,
            chatCompletionResponse.usage?.prompt_tokens_details?.audio_tokens ||
              0
          ),
          new CompletionTokenDetails(
            chatCompletionResponse.usage?.completion_tokens_details
              ?.reasoning_tokens || 0,
            chatCompletionResponse.usage?.completion_tokens_details
              ?.audio_tokens || 0,
            0,
            0
          )
        ),
        system_fingerprint: chatCompletionResponse.system_fingerprint,
      });

      await this.application_chat_service.CreateChatCompletion(
        chatCompletionInput
      );

      return res.status(200).json(chatCompletionResponse);
    } catch (error) {
      console.error("Error in ChaCompletion:", error);
      return res.status(500).json({ error: "Failed to complete the request" });
    }
  }

  public async ChatCompletionStream(
    req: Request,
    res: Response
  ): Promise<void> {
    // Cambiado a void porque manejaremos el response stream directamente
    const { messages } = req.body;
    try {
      res.setHeader("Content-Type", "text/event-stream");
      res.setHeader("Cache-Control", "no-cache");
      res.setHeader("Connection", "keep-alive");

      const chatCompletionResponse: any =
        await this.application_openai_api.ChatCompletionStream(messages);

      console.log(
        "chatCompletionResponse: ",
        JSON.stringify(chatCompletionResponse)
      );

      for await (const chunk of chatCompletionResponse) {
        // Enviar la parte del contenido al cliente

        console.log(
          "chunk: ",
          JSON.stringify(chunk)
        );
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          res.write(`data: ${content}\n`);
        }
      }

      // Finalizar el stream
      res.write("data: stream_done\n");
      res.end();
    } catch (error) {
      console.error("Error in ChatCompletionStream:", error);
      res.status(500).json({ error: "Failed to complete the request" });
    }
  }
}
