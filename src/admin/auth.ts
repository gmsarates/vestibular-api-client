import { httpClient } from "./client.js";
import type { User, LoginResponse } from "./types.js";

export class AuthService {
  async login(email: string, password: string): Promise<LoginResponse> {
    return httpClient.postRaw<LoginResponse>("admin/auth/login", {
      email,
      password,
    });
  }

  async getMe(): Promise<User> {
    return httpClient.get<User>("admin/me?include=university");
  }

  // Alias for backward compatibility
  async me(): Promise<User> {
    return this.getMe();
  }

  async logout(): Promise<void> {
    return httpClient.postRaw<void>("admin/me/logout", {});
  }
}

export const authService = new AuthService();
