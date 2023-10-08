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

  async run(model: string, input: unknown) {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${this.#accountId}/ai/run/${model}`,
      {
        headers: { Authorization: `Bearer ${this.#apiToken}` },
        method: "POST",
        body: JSON.stringify(input),
      },
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error("Cloudflare AI returned an error", { cause: result });
    }

    return result;
  }
}
