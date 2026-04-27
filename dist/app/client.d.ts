import type { ClientOptions } from "./types";
/**
 * Configure the base URL for all API requests
 * Call this once at the start of your application
 *
 * @example
 * // In your React app main.tsx or App.tsx
 * import { setBaseUrl } from "@gmsarates/vestibular-api-client";
 *
 * setBaseUrl("https://api.myserver.com");
 */
export declare function setBaseUrl(baseUrl: string): void;
export declare function setAppToken(token: string): void;
export declare class HttpClient {
    private baseUrl;
    constructor(options: ClientOptions);
    getBaseUrl(): string;
    setAppToken(token: string): void;
    private getToken;
    private getHeaders;
    private getIncludedMap;
    private normalizeJsonApiResource;
    private normalizeJsonApi;
    private handleResponse;
    private request;
    get<T>(path: string): Promise<T>;
    getRaw<T>(path: string): Promise<T>;
    post<T>(path: string, body: unknown): Promise<T>;
    postRaw<T>(path: string, body: unknown): Promise<T>;
    put<T>(path: string, body: unknown): Promise<T>;
    delete<T>(path: string): Promise<T>;
}
export declare const httpClient: {
    get<T>(path: string): Promise<T>;
    getRaw<T>(path: string): Promise<T>;
    post<T>(path: string, body: unknown): Promise<T>;
    postRaw<T>(path: string, body: unknown): Promise<T>;
    put<T>(path: string, body: unknown): Promise<T>;
    delete<T>(path: string): Promise<T>;
    getBaseUrl(): string;
    setAppToken(token: string): void;
};
