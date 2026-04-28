import { httpClient } from "../client.js";
import type { Exam } from "../types.js";

export class ExamService {
  async list(): Promise<Exam[]> {  
    const query = "?include=university";
    return httpClient.get<Exam[]>(`candidate/exam${query}`);
  }
}

export const examService = new ExamService();
