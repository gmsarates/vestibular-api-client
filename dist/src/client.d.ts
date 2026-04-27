export declare class HttpClient {
    private baseUrl;
    constructor();
    private getBaseUrl;
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
    setBaseUrl(url: string): void;
}
export declare const httpClient: HttpClient;
