import { ChatRepository } from "../../domain/repository/chat_repository";
import { Pool } from "pg";
import ChatInput from "../../domain/model/chat_entity";

export default class ChatRepositoryPSQL implements ChatRepository {
  private psqlClient: Pool;

  constructor(pool: Pool) {
    this.psqlClient = pool;
  }

  // Método para almacenar un chat completion en la base de datos
  public async CreateChatCompletion(message: ChatInput): Promise<void> {
    const { id, object, created, model, system_fingerprint, choices, usage } =
      message;

    try {
      // Iniciar una transacción
      await this.psqlClient.query("BEGIN");

      // Insertar en la tabla chat.completions
      const completionResult = await this.psqlClient.query(
        `INSERT INTO chat.completions (openai_id, object, created, model, system_fingerprint) 
         VALUES ($1, $2, to_timestamp($3), $4, $5) RETURNING id`,
        [id, object, created, model, system_fingerprint]
      );
      const completionId = completionResult.rows[0].id;

      // Insertar en la tabla chat.usage
      const usageResult = await this.psqlClient.query(
        `INSERT INTO chat.usage (completion_id, prompt_tokens, completion_tokens, total_tokens)
         VALUES ($1, $2, $3, $4) RETURNING usage_id`,
        [
          completionId,
          usage?.prompt_tokens ?? 0,
          usage?.completion_tokens ?? 0,
          usage?.total_tokens ?? 0,
        ]
      );
      const usageId = usageResult.rows[0].usage_id;

      // Verificar si 'completion_tokens_details' existe y luego insertar
      if (usage?.completion_tokens_details) {
        const {
          reasoning_tokens,
          accepted_prediction_tokens,
          rejected_prediction_tokens,
        } = usage.completion_tokens_details;

        await this.psqlClient.query(
          `INSERT INTO chat.completion_tokens_details (usage_id, reasoning_tokens, accepted_prediction_tokens, rejected_prediction_tokens)
           VALUES ($1, $2, $3, $4)`,
          [
            usageId,
            reasoning_tokens,
            accepted_prediction_tokens,
            rejected_prediction_tokens,
          ]
        );
      }

      // Insertar en la tabla chat.choices
      for (const choice of choices) {
        const { index, message: { role, content }, logprobs, finish_reason } = choice;
        await this.psqlClient.query(
          `INSERT INTO chat.choices (completion_id, index, role, content, logprobs, finish_reason)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [completionId, index, role, content, logprobs, finish_reason]
        );
      }

      // Confirmar la transacción
      await this.psqlClient.query("COMMIT");
    } catch (error) {
      // En caso de error, hacer rollback
      await this.psqlClient.query("ROLLBACK");
      console.error("Error inserting chat completion data:", error);
      throw error;
    }
  }
}
