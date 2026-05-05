import { httpClient } from "../client.js";
import type { Attempt, AttemptUpdate } from "../types.js";

export class AttemptService {
  async list(universityId?: string): Promise<Attempt[]> {
    const query = universityId
      ? `?include=candidate,exam,university&university_id=${universityId}`
      : "?include=candidate,exam,university";
    return httpClient.get<Attempt[]>(`admin/attempt${query}`);
  }

  async update(id: string, data: Partial<AttemptUpdate>): Promise<Attempt> {
    return httpClient.put<Attempt>(`admin/attempt/${id}`, data);
  }

  async retry(id: string): Promise<Attempt> {
    return httpClient.post<Attempt>(`admin/attempt/${id}/retry`, {});
  }

  async delete(id: string): Promise<Attempt> {
    return httpClient.delete<Attempt>(`admin/attempt/${id}`);
  }
}

export const attemptService = new AttemptService();
