"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = exports.AuthService = void 0;
const client_1 = require("./client");
class AuthService {
    async login(email, password) {
        return client_1.httpClient.postRaw("admin/auth/login", {
            email,
            password,
        });
    }
    async getMe() {
        return client_1.httpClient.get("admin/me?include=university");
    }
    // Alias for backward compatibility
    async me() {
        return this.getMe();
    }
    async logout() {
        return client_1.httpClient.postRaw("admin/me/logout", {});
    }
}
exports.AuthService = AuthService;
exports.authService = new AuthService();
