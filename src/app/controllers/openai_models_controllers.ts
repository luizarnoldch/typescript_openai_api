import "dotenv/config";

import { Request, Response } from "express";
import { OpenAIAPIConsumer } from "../../openai/application/service/openai_api";
import ServiceOpenAIAPIConsumer from "../../openai/application/service/service_openai_api";
import { OpenAIAPI } from "../../openai/domain/repository/openai_api";
import ClientOpenAIAPI from "../../openai/infrastructure/adapter/client_openai_api";

export default class OpenAIModelsControllers {
  private infrastructure_openai_api: OpenAIAPI;
  private application_openai_api: OpenAIAPIConsumer;

  constructor() {
    this.infrastructure_openai_api = new ClientOpenAIAPI(
      process.env.OPENAI_API_KEY as string
    );
    this.application_openai_api = new ServiceOpenAIAPIConsumer(
      this.infrastructure_openai_api
    );
  }

  public async ListModels(req: Request, res: Response): Promise<Response> {
    try {
      const modelPageList = await this.application_openai_api.ListModels();
      return res
        .status(200)
        .json({ object: modelPageList.object, data: modelPageList.data });
    } catch (error) {
      console.error("Error in ListModels:", error);
      return res.status(500).json({ error: "Failed to complete the request" });
    }
  }
}
