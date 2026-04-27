"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpClient = exports.HttpClient = void 0;
const isBrowser = typeof window !== "undefined";
class HttpClient {
    constructor() {
        this.baseUrl = this.getBaseUrl();
    }
    getBaseUrl() {
        if (!isBrowser) {
            return import.meta.env.VITE_API_BASE_URL || "https://api.example.com/";
        }
        return (localStorage.getItem("baseUrl") ||
            import.meta.env.VITE_API_BASE_URL ||
            "https://api.example.com/");
    }
    getToken() {
        if (!isBrowser)
            return null;
        return localStorage.getItem("adminAuthToken");
    }
    getHeaders() {
        const headers = {
            Accept: "application/json",
            "Content-Type": "application/json",
        };
        const token = this.getToken();
        if (token) {
            headers["Authorization"] = `Bearer ${token}`;
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
            return {};
        }
        const json = JSON.parse(text);
        return raw ? json : this.normalizeJsonApi(json);
    }
    async request(method, path, body, raw = false) {
        const response = await fetch(`${this.baseUrl}${path}`, {
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
    setBaseUrl(url) {
        if (!isBrowser)
            return;
        localStorage.setItem("baseUrl", url);
        window.location.reload();
    }
}
exports.HttpClient = HttpClient;
exports.httpClient = new HttpClient();
