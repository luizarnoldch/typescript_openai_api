import { Router, Request, Response } from "express";
import OpenAIChatControllers from "../controllers/openai_chat_controllers";

export default class OpenAIChatRoutes {
  public router: Router;
  private controllers: OpenAIChatControllers;

  constructor() {
    this.router = Router();
    this.controllers = new OpenAIChatControllers();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    /**
     * @swagger
     * /v1/chat/completion:
     *  post:
     *    summary: Create chat completion.
     *    description: Creates a model response for the given chat conversation. Learn more in the text generation, vision, and audio guides.
     *    tags: [Chats]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              messages:
     *                type: string
     *                description: The message to send to the AI for completion.
     *                example: "Dame una historia de 4 palabras"
     *            required:
     *              - name
     *              - description
     *    responses:
     *      200:
     *        description: Success response with the chat completion result.
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                id:
     *                  type: string
     *                  description: Unique identifier of the response.
     *                  example: "chatcmpl-123"
     *                object:
     *                  type: string
     *                  description: The object type, e.g., "chat.completion".
     *                  example: "chat.completion"
     *                created:
     *                  type: integer
     *                  description: The timestamp when the response was created.
     *                  example: 1677652288
     *                model:
     *                  type: string
     *                  description: The model used to generate the response.
     *                  example: "gpt-4o-mini"
     *                choices:
     *                  type: array
     *                  description: Array of choices containing the generated message.
     *                  items:
     *                    type: object
     *                    properties:
     *                      index:
     *                        type: integer
     *                        description: The index of the choice.
     *                        example: 0
     *                      message:
     *                        type: object
     *                        properties:
     *                          role:
     *                            type: string
     *                            description: The role of the AI in the response.
     *                            example: "assistant"
     *                          content:
     *                            type: string
     *                            description: The generated response content.
     *                            example: "\n\nHello there, how may I assist you today?"
     *                          refusal:
     *                            type: string
     *                            nullable: true
     *                            description: Any refusal message, if applicable.
     *                            example: null
     *                      logprobs:
     *                        type: object
     *                        nullable: true
     *                        description: Log probabilities, if available.
     *                        example: null
     *                      finish_reason:
     *                        type: string
     *                        description: The reason for finishing the response generation.
     *                        example: "stop"
     *                usage:
     *                  type: object
     *                  properties:
     *                    prompt_tokens:
     *                      type: integer
     *                      description: Number of tokens in the prompt.
     *                      example: 9
     *                    completion_tokens:
     *                      type: integer
     *                      description: Number of tokens in the completion.
     *                      example: 12
     *                    total_tokens:
     *                      type: integer
     *                      description: Total tokens used.
     *                      example: 21
     *                    prompt_tokens_details:
     *                      type: object
     *                      properties:
     *                        cached_tokens:
     *                          type: integer
     *                          description: Number of cached tokens in the prompt.
     *                          example: 0
     *                    completion_tokens_details:
     *                      type: object
     *                      properties:
     *                        reasoning_tokens:
     *                          type: integer
     *                          description: Number of reasoning tokens in the completion.
     *                          example: 0
     *                        accepted_prediction_tokens:
     *                          type: integer
     *                          description: Number of accepted prediction tokens.
     *                          example: 0
     *                        rejected_prediction_tokens:
     *                          type: integer
     *                          description: Number of rejected prediction tokens.
     *                          example: 0
     *                system_fingerprint:
     *                  type: string
     *                  description: System fingerprint for tracking the response.
     *                  example: "fp_0ba0d124f1"
     *      400:
     *        description: Bad Request. Indicates missing or invalid input fields.
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                error:
     *                  type: string
     *                  example: "Invalid request body. 'message' field is required and should be a string."
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
    this.router.post("/completion", async (req: Request, res: Response) => {
      await this.controllers.ChaCompletion(req, res);
    });

    /**
     * @swagger
     * /v1/chat/completion/stream:
     *  post:
     *    summary: Create chat completion stream.
     *    description: Streams the model's response for the given chat conversation. The response is sent as a series of events.
     *    tags: [Chats]
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            type: object
     *            properties:
     *              messages:
     *                type: string
     *                description: The message to send to the AI for completion.
     *                example: "Dame una historia de 4 palabras"
     *            required:
     *              - messages
     *    responses:
     *      200:
     *        description: Success response with streamed chat completion results.
     *        content:
     *          text/event-stream:
     *            schema:
     *              type: string
     *              description: The streamed response content.
     *              example: |
     *                data: Am
     *                data: or
     *                data: eterno
     *                data: ,
     *                data: caminos
     *                data: separados
     *                data: .
     *                data: stream_done
     *      400:
     *        description: Bad Request. Indicates missing or invalid input fields.
     *        content:
     *          application/json:
     *            schema:
     *              type: object
     *              properties:
     *                error:
     *                  type: string
     *                  example: "Invalid request body. 'messages' field is required and should be a string."
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
    this.router.post(
      "/completion/stream",
      async (req: Request, res: Response) => {
        await this.controllers.ChatCompletionStream(req, res);
      }
    );
  }
}
