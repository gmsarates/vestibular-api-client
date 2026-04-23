import { httpClient } from "./client";
import type { User } from "./types";

export class UserService {
  async list(universityId?: string): Promise<User[]> {
    const query = universityId
      ? `?include=university&university_id=${universityId}`
      : "?include=university";
    return httpClient.get<User[]>(`admin/user${query}`);
  }

  async create(data: Omit<User, "id">): Promise<User> {
    return httpClient.post<User>("admin/user", data);
  }

  async update(id: string, data: Partial<User>): Promise<User> {
    return httpClient.put<User>(`admin/user/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return httpClient.delete(`admin/user/${id}`);
  }
}

export const userService = new UserService();
