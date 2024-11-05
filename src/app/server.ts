import "dotenv/config";

import express, { Application } from "express";
import morgan from "morgan";
import Routes from "./routes";
import swaggerUI from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import OpenAIRoutes from "./routes/openai_routes";
import { options } from "./swaggerOptions";

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
    const requiredEnvVars = ["PORT", "OPENAI_API_KEY"];
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
    this.expressApp.use(express.json());
    this.expressApp.use(morgan("dev"));
  }

  private initializeRoutes(): void {
    // SWAGGER
    const specs = swaggerJSDoc(options);
    this.expressApp.use("/docs/", swaggerUI.serve, swaggerUI.setup(specs));

    const routes = new Routes();
    this.expressApp.use("/v1/", routes.router);
    
    // Chat EndPoints
    const openaiRoutes = new OpenAIRoutes();
    this.expressApp.use("/v1/chat/", openaiRoutes.router);
  }

  public listen(): void {
    this.expressApp.listen(this.port, () => {
      console.log(`Servidor corriendo en http://localhost:${this.port}`);
    });
  }
}

export default Server;
