import type { JsonApiRelationship, JsonApiResource, JsonApiResponse, ClientOptions } from "./types.ts";

const isBrowser = typeof window !== "undefined";
var APP_AUTH_TOKEN_STORAGE_KEY = "";
var APP_AUTH_TOKEN_EXPIRES_STORAGE_KEY = "";

function setStoredAppToken(token: string | null): void {
  if (isBrowser) {
    if (token === null) {
      localStorage.removeItem(APP_AUTH_TOKEN_STORAGE_KEY)
    } else {
      localStorage.setItem(APP_AUTH_TOKEN_STORAGE_KEY, token);
    }
  }
}

function setStoredAppTokenExpires(timestamp: string): void {
  if (isBrowser) {
    localStorage.setItem(APP_AUTH_TOKEN_EXPIRES_STORAGE_KEY, timestamp);
  }
}

function getStoredAppToken(): string | null {
  if (!isBrowser) return null;
  return localStorage.getItem(APP_AUTH_TOKEN_STORAGE_KEY);
}

function getStoredAppTokenExpires(): string | null {
  if (!isBrowser) return null;
  return localStorage.getItem(APP_AUTH_TOKEN_EXPIRES_STORAGE_KEY);
}

function clearStoredAppToken(): void {
  if (isBrowser) {
    localStorage.removeItem(APP_AUTH_TOKEN_STORAGE_KEY);
  }
}

function joinUrl(baseUrl: string, path: string): string {
  const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${normalizedBase}${normalizedPath}`;
}

// Configuration state
let configuredBaseUrl = "http://localhost:3000/api";
let httpClientInstance: HttpClient | null = null;

export function setBaseUrl(baseUrl: string): void {
  configuredBaseUrl = baseUrl;
  // Reset instance to use new baseUrl
  httpClientInstance = null;
}

export function setAppToken(token: string | null): void {
  setStoredAppToken(token)
}

export function setAppTokenExpires(timestamp: string): void {
  setStoredAppTokenExpires(timestamp);
}

export function setAppEnv(env: string): void {
  APP_AUTH_TOKEN_STORAGE_KEY = env + 'AuthToken';
  APP_AUTH_TOKEN_EXPIRES_STORAGE_KEY = env + 'AuthTokenExpires';
}

function getHttpClientInstance(): HttpClient {
  if (!httpClientInstance) {
    httpClientInstance = new HttpClient({ baseUrl: configuredBaseUrl });
  }
  return httpClientInstance;
}

export class HttpClient {
  private baseUrl: string;

  constructor(options: ClientOptions) {
    this.baseUrl = options.baseUrl;
  }

  getBaseUrl() {
    return this.baseUrl;
  }

  getTokenExpires(): string | null {
    return getStoredAppTokenExpires();
  }

  setAppToken(token: string | null): void {
    setStoredAppToken(token);
  }

  setAppTokenExpires(timestamp: string): void {
    setStoredAppTokenExpires(timestamp);
  }

  private getToken(): string | null {
    return getStoredAppToken();
  }

  private getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };
    const token = this.getToken();
    if (token) {
      const expiresAt = new Date(this.getTokenExpires() ?? '2026-01-01T00:00:00')
      const now = new Date()
      
      if (now > expiresAt) {
        this.setAppToken(null)
      } else {
        headers["Authorization"] = `Bearer ${token}`;
      }

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
        clearStoredAppToken();
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
    const response = await fetch(joinUrl(this.baseUrl, path), {
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

export const httpClient: HttpClient = new Proxy({} as HttpClient, {
  get(_target, prop) {
    const client = getHttpClientInstance() as unknown as Record<PropertyKey, unknown>;
    const value = client[prop];
    if (typeof value === "function") {
      return (value as (...args: unknown[]) => unknown).bind(client);
    }
    return value;
  },
});
