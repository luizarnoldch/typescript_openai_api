import "dotenv/config";

import { Request, Response } from "express";
import { OpenAIAPIConsumer } from "../../openai/application/service/openai_api";
import ServiceOpenAIAPIConsumer from "../../openai/application/service/service_openai_api";
import { OpenAIAPI } from "../../openai/domain/repository/openai_api";
import ClientOpenAIAPI from "../../openai/infrastructure/adapter/client_openai_api";

export default class OpenAIControllers {
  public infrastructure: OpenAIAPI;
  public application: OpenAIAPIConsumer;

  constructor() {
    this.infrastructure = new ClientOpenAIAPI(
      process.env.OPENAI_API_KEY as string
    );
    this.application = new ServiceOpenAIAPIConsumer(this.infrastructure);
  }

  public async ChaCompletion(req: Request, res: Response): Promise<void> {
    const { messages } = req.body;
    try {
      const response = await this.application.ChatCompletion(messages);
      res.status(200).json(response);
    } catch (error) {
      console.error("Error in ChaCompletion:", error);
      res.status(500).json({ error: "Failed to complete the request" });
    }
  }
}
