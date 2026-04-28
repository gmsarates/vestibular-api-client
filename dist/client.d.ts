import type { ClientOptions } from "./types.ts";
export declare function setBaseUrl(baseUrl: string): void;
export declare function setAppToken(token: string): void;
export declare function setAppTokenExpires(timestamp: string): void;
export declare function setAppEnv(env: string): void;
export declare function clearAppToken(): void;
export declare class HttpClient {
    private baseUrl;
    constructor(options: ClientOptions);
    getBaseUrl(): string;
    getTokenExpires(): string | null;
    setAppToken(token: string): void;
    setAppTokenExpires(timestamp: string): void;
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
export declare const httpClient: HttpClient;
