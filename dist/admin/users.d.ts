import type { User } from "./types.js";
export declare class UserService {
    list(universityId?: string): Promise<User[]>;
    create(data: Omit<User, "id">): Promise<User>;
    update(id: string, data: Partial<User>): Promise<User>;
    delete(id: string): Promise<void>;
}
export declare const userService: UserService;
