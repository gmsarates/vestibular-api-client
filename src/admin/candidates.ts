import { httpClient } from "./client.js";
import type { Candidate } from "./types.js";

export class CandidateService {
  async list(universityId?: string): Promise<Candidate[]> {
    const query = universityId
      ? `?include=university&university_id=${universityId}`
      : "?include=university";
    return httpClient.get<Candidate[]>(`admin/candidate${query}`);
  }

  async create(data: Omit<Candidate, "id">): Promise<Candidate> {
    return httpClient.post<Candidate>("admin/candidate", data);
  }

  async update(id: string, data: Partial<Candidate>): Promise<Candidate> {
    return httpClient.put<Candidate>(`admin/candidate/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return httpClient.delete(`admin/candidate/${id}`);
  }
}

export const candidateService = new CandidateService();
