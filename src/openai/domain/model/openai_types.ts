import {
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletion,
  ModelsPage,
  Models,
} from "openai/resources";

// ========== Chat-Types ========== <- BEGIN
export type ChatCompletionInput = ChatCompletionCreateParamsNonStreaming;

export type ChatCompletionOutput = ChatCompletion & {
  _request_id?: string | null;
};
// ========== Chat-Types ========== <- END

// ========== Models-Types ========== <- BEGIN
export type ModelsOutput = ModelsPage;
// ========== Models-Types ========== <- END
