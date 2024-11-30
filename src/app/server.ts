import "dotenv/config";

import express, { Application } from "express";
import cors from "cors";
import morgan from "morgan";
import Routes from "./routes";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions";
import OpenAIChatRoutes from "./routes/openai_chat_routes";
import OpenAIModelsRoutes from "./routes/openai_models_routes";

class Server {
  public expressApp: Application;
  private port: number;

  constructor() {
    this.expressApp = express();
    this.sanityCheckEnvVariables();
    this.port = parseInt(process.env.PORT || "3000", 10);
    this.initializeMiddlewares();
    this.initializeRoutes();
  }

  private sanityCheckEnvVariables(): void {
    const requiredEnvVars = [
      "PORT",
      "EXT_PORT",
      "OPENAI_API_KEY",
      "PG_HOST",
      "PG_USER",
      "PG_PASSWORD",
      "PG_DATABASE",
      "PG_PORT",
      "PG_MAX_CONNECTIONS",
      "PG_SSL",
      "PG_TIME_LIMIT",
      "PG_CONNECTION_LIMIT",
    ];
    const missingVariables: string[] = [];

    requiredEnvVars.forEach((variable) => {
      if (!process.env[variable]) {
        missingVariables.push(variable);
      }
    });

    if (missingVariables.length > 0) {
      throw new Error(
        `Missing required environment variables: ${missingVariables.join(", ")}`
      );
    }
  }

  private initializeMiddlewares(): void {
    this.expressApp.use(cors());
    this.expressApp.use(express.json());
    this.expressApp.use(morgan("dev"));
  }

  private initializeRoutes(): void {
    // SWAGGER
    const specs = swaggerJSDoc(options);
    this.expressApp.use("/docs/", swaggerUI.serve, swaggerUI.setup(specs));

    const routes = new Routes();
    this.expressApp.use("/v1/", routes.router);

    // OpenAI Chat Routes
    const openaiChatRoutes = new OpenAIChatRoutes();
    this.expressApp.use("/v1/chat/", openaiChatRoutes.router);

    // OpenAI Models Routes
    const openaiModelsRoutes = new OpenAIModelsRoutes();
    this.expressApp.use("/v1/models/", openaiModelsRoutes.router);
  }

  public listen(): void {
    this.expressApp.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}

export default Server;
