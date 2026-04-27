import { httpClient } from "./client.js";
import type { University, UniversityUpdate } from "./types.js";

export class UniversityService {
  async list(): Promise<University[]> {
    return httpClient.get<University[]>("admin/university?include=courses,exams");
  }

  async create(data: Omit<University, "id">): Promise<University> {
    return httpClient.post<University>("admin/university", data);
  }

  async update(id: string, data: UniversityUpdate): Promise<University> {
    return httpClient.put<University>(`admin/university/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return httpClient.delete(`admin/university/${id}`);
  }
}

export const universityService = new UniversityService();
