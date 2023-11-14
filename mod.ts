export interface CloudflareAiCredentials {
  accountId: string;
  apiToken: string;
}

export class CloudflareAi {
  readonly #accountId: string;
  readonly #apiToken: string;

  constructor({ accountId, apiToken }: CloudflareAiCredentials) {
    this.#accountId = accountId;
    this.#apiToken = apiToken;
  }

  run(model: string, input: unknown) {
    const isBinary = input instanceof Uint8Array ||
      input instanceof ReadableStream ||
      input instanceof Blob ||
      input instanceof ArrayBuffer;

    return fetch(
      `https://api.cloudflare.com/client/v4/accounts/${this.#accountId}/ai/run/${model}`,
      {
        headers: { Authorization: `Bearer ${this.#apiToken}` },
        method: "POST",
        body: isBinary ? input : JSON.stringify(input),
      },
    );
  }
}
