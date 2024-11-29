import { Router, Request, Response } from "express"; 
import OpenAIModelsControllers from "../controllers/openai_models_controllers"; 

export default class OpenAIModelsRoutes { 
  public router: Router; 
  private controllers: OpenAIModelsControllers; 

  constructor() { 
    this.router = Router(); 
    this.controllers = new OpenAIModelsControllers(); 
    this.initializeRoutes(); 
  } 

  private initializeRoutes(): void { 
    /** 
     * @swagger 
     * /v1/models/list: 
     *  get: 
     *    summary: List models 
     *    description: Lists the currently available models, and provides basic information about each one such as the owner and availability. 
     *    tags: [Models] 
     *    responses: 
     *      200: 
     *        description: Describes an OpenAI model offering that can be used with the API. 
     *        content: 
     *          application/json: 
     *            schema: 
     *              type: object 
     *              properties: 
     *                object: 
     *                  type: string 
     *                  description: The type of object returned, which is always "list". 
     *                  example: "list" 
     *                data: 
     *                  type: array 
     *                  items: 
     *                    type: object 
     *                    properties: 
     *                      id: 
     *                        type: string 
     *                        description: The model identifier, which can be referenced in the API endpoints. 
     *                        example: "davinci" 
     *                      created: 
     *                        type: integer 
     *                        description: The Unix timestamp (in seconds) when the model was created. 
     *                        example: 1686935002 
     *                      object: 
     *                        type: string 
     *                        description: The object type, which is always "model". 
     *                        example: "model" 
     *                      owned_by: 
     *                        type: string 
     *                        description: The organization that owns the model. 
     *                        example: "openai" 
     *      500: 
     *        description: Internal Server Error. Indicates an error with the OpenAI API or server. 
     *        content: 
     *          application/json: 
     *            schema: 
     *              type: object 
     *              properties: 
     *                error: 
     *                  type: string 
     *                  example: "Failed to complete the request" 
     */ 
    this.router.get("/list", async (req: Request, res: Response) => { 
      await this.controllers.ListModels(req, res); 
    }); 
  } 
}