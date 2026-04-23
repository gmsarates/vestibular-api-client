import type { JsonApiRelationship, JsonApiResource, JsonApiResponse, ClientOptions } from "./types";

const isBrowser = typeof window !== "undefined";

export class HttpClient {
  private baseUrl: string;

  constructor(options: ClientOptions) {
    this.baseUrl = options.baseUrl;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  private getToken(): string | null {
    if (!isBrowser) return null;
    return localStorage.getItem("adminAuthToken");
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
    return headers;
  }

  private getIncludedMap(included?: JsonApiResource[]) {
    const map = new Map<string, JsonApiResource>();
    included?.forEach((item) => map.set(`${item.type}:${item.id}`, item));
    return map;
  }

  private normalizeJsonApiResource(
    item: JsonApiResource,
    includedMap: Map<string, JsonApiResource>
  ): Record<string, unknown> {
    const result: Record<string, unknown> = {
      id: item.id,
      ...(item.attributes || {}),
    };

    if (!item.relationships) return result;

    for (const [key, relationship] of Object.entries(item.relationships)) {
      const relData = relationship?.data;
      if (Array.isArray(relData)) {
        const ids = relData.map((relation) => relation.id);
        result[`${key}_ids`] = ids;
        result[key] = relData.map((relation) => {
          const included = includedMap.get(`${relation.type}:${relation.id}`);
          return included
            ? this.normalizeJsonApiResource(included, includedMap)
            : { id: relation.id, type: relation.type };
        });
        continue;
      }

      if (relData && typeof relData === "object") {
        result[`${key}_id`] = relData.id;
        const included = includedMap.get(`${relData.type}:${relData.id}`);
        if (included) {
          result[key] = this.normalizeJsonApiResource(included, includedMap);
        }
      }
    }

    return result;
  }

  private normalizeJsonApi<T>(json: unknown): T {
    if (json && typeof json === "object" && "data" in json) {
      const { data, included } = json as JsonApiResponse;
      const includedMap = this.getIncludedMap(included);

      if (Array.isArray(data)) {
        return data.map((item) =>
          this.normalizeJsonApiResource(item, includedMap)
        ) as unknown as T;
      }

      if (data && typeof data === "object" && "id" in data) {
        return this.normalizeJsonApiResource(
          data,
          includedMap
        ) as unknown as T;
      }
    }

    return json as T;
  }

  private async handleResponse<T>(
    response: Response,
    raw = false
  ): Promise<T> {
    if (response.status === 401) {
      if (isBrowser) {
        localStorage.removeItem("adminAuthToken");
        window.location.href = "/login";
      }
      throw new Error("Sessão expirada");
    }

    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      throw new Error(body.message || `Erro ${response.status}`);
    }

    const text = await response.text();
    if (text === null || text.trim() === "") {
      return {} as T;
    }

    const json = JSON.parse(text);

    return raw ? json : this.normalizeJsonApi<T>(json);
  }

  private async request<T>(
    method: string,
    path: string,
    body?: unknown,
    raw = false
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      method,
      headers: this.getHeaders(),
      body: body ? JSON.stringify(body) : undefined,
    });
    return this.handleResponse<T>(response, raw);
  }

  async get<T>(path: string): Promise<T> {
    return this.request<T>("GET", path);
  }

  async getRaw<T>(path: string): Promise<T> {
    return this.request<T>("GET", path, undefined, true);
  }

  async post<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>("POST", path, body);
  }

  async postRaw<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>("POST", path, body, true);
  }

  async put<T>(path: string, body: unknown): Promise<T> {
    return this.request<T>("PUT", path, body);
  }

  async delete<T>(path: string): Promise<T> {
    return this.request<T>("DELETE", path);
  }
}

export const httpClient = new HttpClient({ baseUrl: "http://localhost:3000/api" });
