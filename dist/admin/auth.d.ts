import type { User, LoginResponse } from "./types";
export declare class AuthService {
    login(email: string, password: string): Promise<LoginResponse>;
    getMe(): Promise<User>;
    me(): Promise<User>;
    logout(): Promise<void>;
}
export declare const authService: AuthService;
