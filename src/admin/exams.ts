import { httpClient } from "./client";
import type { Exam } from "./types";

export class ExamService {
  async list(universityId?: string): Promise<Exam[]> {
    const query = universityId
      ? `?include=university&university_id=${universityId}`
      : "?include=university";
    return httpClient.get<Exam[]>(`admin/exam${query}`);
  }

  async create(data: Omit<Exam, "id">): Promise<Exam> {
    return httpClient.post<Exam>("admin/exam", data);
  }

  async update(id: string, data: Partial<Exam>): Promise<Exam> {
    return httpClient.put<Exam>(`admin/exam/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return httpClient.delete(`admin/exam/${id}`);
  }
}

export const examService = new ExamService();
