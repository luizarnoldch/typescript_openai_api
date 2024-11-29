// Message class
export class Message {
  role: string;
  content: string | null;
  refusal: string | null;

  constructor(
    role: string,
    content: string | null = null,
    refusal: string | null = null
  ) {
    this.role = role;
    this.content = content;
    this.refusal = refusal;
  }
}

// Choice class
export class Choice {
  index: number;
  message: Message;
  logprobs: any | null;
  finish_reason: string;

  constructor(
    index: number,
    message: Message,
    logprobs: any | null = null,
    finish_reason: string
  ) {
    this.index = index;
    this.message = message;
    this.logprobs = logprobs;
    this.finish_reason = finish_reason;
  }
}

// PromptTokensDetails class
export class PromptTokensDetails {
  cached_tokens?: number | undefined;
  audio_tokens?: number;

  constructor(cached_tokens: number | undefined, audio_tokens: number) {
    this.cached_tokens = cached_tokens;
    this.audio_tokens = audio_tokens;
  }
}

// CompletionTokenDetails class
export class CompletionTokenDetails {
  reasoning_tokens: number;
  audio_tokens: number;
  accepted_prediction_tokens: number;
  rejected_prediction_tokens: number;

  constructor(
    reasoning_tokens: number,
    audio_tokens: number,
    accepted_prediction_tokens: number,
    rejected_prediction_tokens: number
  ) {
    this.reasoning_tokens = reasoning_tokens;
    this.audio_tokens = audio_tokens;
    this.accepted_prediction_tokens = accepted_prediction_tokens;
    this.rejected_prediction_tokens = rejected_prediction_tokens;
  }
}

// Usage class
export class Usage {
  prompt_tokens: number | undefined;
  completion_tokens: number;
  total_tokens: number;
  prompt_tokens_details: PromptTokensDetails | undefined;
  completion_tokens_details: CompletionTokenDetails | undefined;

  constructor(
    prompt_tokens: number,
    completion_tokens: number,
    total_tokens: number,
    prompt_tokens_details?: PromptTokensDetails,
    completion_tokens_details?: CompletionTokenDetails | undefined
  ) {
    this.prompt_tokens = prompt_tokens;
    this.completion_tokens = completion_tokens;
    this.total_tokens = total_tokens;
    this.prompt_tokens_details = prompt_tokens_details;
    this.completion_tokens_details = completion_tokens_details;
  }
}

// ChatInput class
export default class ChatInput {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Choice[];
  usage: Usage | undefined;
  system_fingerprint: string | undefined;

  constructor(data: {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: Choice[];
    usage: Usage | undefined;
    system_fingerprint: string | undefined;
  }) {
    this.id = data.id;
    this.object = data.object;
    this.created = data.created;
    this.model = data.model;
    this.choices = data.choices;
    this.usage = data.usage;
    this.system_fingerprint = data.system_fingerprint;
  }

  getMessageContent(): string {
    return this.choices[0]?.message.content || "";
  }

  getTotalTokens(): number {
    return this.usage?.total_tokens || 0;
  }
}
