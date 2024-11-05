import {
  ChatCompletionCreateParamsNonStreaming,
  ChatCompletion,
} from "openai/resources";

// ========== ChatCompletionInput ========== <- BEGIN
export type ChatCompletionInput = ChatCompletionCreateParamsNonStreaming;
// ========== ChatCompletionInput ========== <- END

// ========== ChatCompletionOutput ========== <- BEGIN
export type ChatCompletionOutput = ChatCompletion & {
  _request_id?: string | null;
};
// ========== ChatCompletionOutput ========== <- END
