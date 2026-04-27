import { httpClient } from "./client";
export class AuthService {
    async login(email, password) {
        return httpClient.postRaw("admin/auth/login", {
            email,
            password,
        });
    }
    async getMe() {
        return httpClient.get("admin/me?include=university");
    }
    // Alias for backward compatibility
    async me() {
        return this.getMe();
    }
    async logout() {
        return httpClient.postRaw("admin/me/logout", {});
    }
}
export const authService = new AuthService();
