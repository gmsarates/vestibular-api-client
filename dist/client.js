import { ErrorMessagesEnum } from "./enums/ErrorMessages.enum.js";
const isBrowser = typeof window !== "undefined";
var APP_AUTH_TOKEN_STORAGE_KEY = "";
var APP_AUTH_TOKEN_EXPIRES_STORAGE_KEY = "";
var APP_REDIRECT_URI_STORAGE_KEY = "";
function setStoredAppToken(token) {
    if (isBrowser) {
        localStorage.setItem(APP_AUTH_TOKEN_STORAGE_KEY, token);
    }
}
function setStoredAppTokenExpires(timestamp) {
    if (isBrowser) {
        localStorage.setItem(APP_AUTH_TOKEN_EXPIRES_STORAGE_KEY, timestamp);
    }
}
function setStoredRedirectUri(uri) {
    if (isBrowser) {
        localStorage.setItem(APP_REDIRECT_URI_STORAGE_KEY, uri);
    }
}
function getStoredAppToken() {
    if (!isBrowser)
        return null;
    return localStorage.getItem(APP_AUTH_TOKEN_STORAGE_KEY);
}
function getStoredAppTokenExpires() {
    if (!isBrowser)
        return null;
    return localStorage.getItem(APP_AUTH_TOKEN_EXPIRES_STORAGE_KEY);
}
function getRedirectUri() {
    if (!isBrowser)
        return null;
    return localStorage.getItem(APP_REDIRECT_URI_STORAGE_KEY);
}
function clearStoredRedirectUri() {
    if (isBrowser) {
        localStorage.removeItem(APP_REDIRECT_URI_STORAGE_KEY);
    }
}
function clearStoredAppToken() {
    if (isBrowser) {
        localStorage.removeItem(APP_AUTH_TOKEN_STORAGE_KEY);
        localStorage.removeItem(APP_AUTH_TOKEN_EXPIRES_STORAGE_KEY);
    }
}
function joinUrl(baseUrl, path) {
    const normalizedBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return `${normalizedBase}${normalizedPath}`;
}
// Configuration state
let configuredBaseUrl = "http://localhost:3000/api";
let httpClientInstance = null;
export function setBaseUrl(baseUrl) {
    configuredBaseUrl = baseUrl;
    // Reset instance to use new baseUrl
    httpClientInstance = null;
}
export function setAppToken(token) {
    setStoredAppToken(token);
}
export function setAppTokenExpires(timestamp) {
    setStoredAppTokenExpires(timestamp);
}
export function setRedirectUri(uri) {
    if (uri === null) {
        clearStoredRedirectUri();
    }
    else {
        setStoredRedirectUri(uri);
    }
}
export function setAppEnv(env) {
    APP_AUTH_TOKEN_STORAGE_KEY = env + 'AuthToken';
    APP_AUTH_TOKEN_EXPIRES_STORAGE_KEY = env + 'AuthTokenExpires';
    APP_REDIRECT_URI_STORAGE_KEY = env + 'RedirectUri';
}
export function clearAppToken() {
    clearStoredAppToken();
}
function getHttpClientInstance() {
    if (!httpClientInstance) {
        httpClientInstance = new HttpClient({ baseUrl: configuredBaseUrl });
    }
    return httpClientInstance;
}
export class HttpClient {
    constructor(options) {
        this.baseUrl = options.baseUrl;
    }
    getBaseUrl() {
        return this.baseUrl;
    }
    getTokenExpires() {
        return getStoredAppTokenExpires();
    }
    setAppToken(token) {
        setStoredAppToken(token);
    }
    setAppTokenExpires(timestamp) {
        setStoredAppTokenExpires(timestamp);
    }
    getToken() {
        return getStoredAppToken();
    }
    getHeaders() {
        var _a;
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        const token = this.getToken();
        if (token) {
            const expiresAt = new Date((_a = this.getTokenExpires()) !== null && _a !== void 0 ? _a : '2026-01-01T00:00:00');
            const now = new Date();
            if (now > expiresAt) {
                clearStoredAppToken();
            }
            else {
                headers["Authorization"] = `Bearer ${token}`;
            }
        }
        return headers;
    }
    getIncludedMap(included) {
        const map = new Map();
        included === null || included === void 0 ? void 0 : included.forEach((item) => map.set(`${item.type}:${item.id}`, item));
        return map;
    }
    normalizeJsonApiResource(item, includedMap) {
        const result = {
            id: item.id,
            ...(item.attributes || {}),
        };
        if (!item.relationships)
            return result;
        for (const [key, relationship] of Object.entries(item.relationships)) {
            const relData = relationship === null || relationship === void 0 ? void 0 : relationship.data;
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
    normalizeJsonApi(json) {
        if (json && typeof json === "object" && "data" in json) {
            const { data, included } = json;
            const includedMap = this.getIncludedMap(included);
            if (Array.isArray(data)) {
                return data.map((item) => this.normalizeJsonApiResource(item, includedMap));
            }
            if (data && typeof data === "object" && "id" in data) {
                return this.normalizeJsonApiResource(data, includedMap);
            }
        }
        return json;
    }
    async handleResponse(response, raw = false) {
        var _a;
        if (response.status === 401) {
            if (isBrowser) {
                clearStoredAppToken();
                const redirect = getRedirectUri();
                if (redirect !== null) {
                    window.location.href = redirect;
                }
            }
            throw new Error("Sessão expirada");
        }
        if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            let errorMessage = (_a = body.message) !== null && _a !== void 0 ? _a : `Erro ${response.status}`;
            if (body.message) {
                let key = body.message.toString().toLowerCase().replaceAll(' ', '_');
                console.info(key);
                if (Object.keys(ErrorMessagesEnum).includes(key)) {
                    errorMessage = ErrorMessagesEnum[key];
                }
            }
            throw new Error(errorMessage);
        }
        const text = await response.text();
        if (text === null || text.trim() === "") {
            return {};
        }
        const json = JSON.parse(text);
        return raw ? json : this.normalizeJsonApi(json);
    }
    async request(method, path, body, raw = false) {
        const response = await fetch(joinUrl(this.baseUrl, path), {
            method,
            headers: this.getHeaders(),
            body: body ? JSON.stringify(body) : undefined,
        });
        return this.handleResponse(response, raw);
    }
    async get(path) {
        return this.request("GET", path);
    }
    async getRaw(path) {
        return this.request("GET", path, undefined, true);
    }
    async post(path, body) {
        return this.request("POST", path, body);
    }
    async postRaw(path, body) {
        return this.request("POST", path, body, true);
    }
    async put(path, body) {
        return this.request("PUT", path, body);
    }
    async delete(path) {
        return this.request("DELETE", path);
    }
}
export const httpClient = new Proxy({}, {
    get(_target, prop) {
        const client = getHttpClientInstance();
        const value = client[prop];
        if (typeof value === "function") {
            return value.bind(client);
        }
        return value;
    },
});
