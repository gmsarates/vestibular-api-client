import { httpClient } from "../client.js";
import type { Exam, ExamUpdateRequest } from "../types.js";

export class ExamService {
  async list(): Promise<Exam[]> {  
    const query = "?include=university";
    return httpClient.get<Exam[]>(`candidate/exam${query}`);
  }

  async start(examId: string): Promise<void> {  
    return httpClient.post(`candidate/exam/${examId}`, {});
  }

  async update(examId: string, data: ExamUpdateRequest): Promise<void> {  
    return httpClient.put(`candidate/exam/${examId}`, data);
  }
}

export const examService = new ExamService();
