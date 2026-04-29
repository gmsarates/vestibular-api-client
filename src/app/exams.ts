import { httpClient } from "../client.js";
import type { Exam, ExamUpdateRequest, StartExamRequest, StartExamResponse } from "../types.js";

export class ExamService {
  async list(): Promise<Exam[]> {  
    const query = "?include=university";
    return httpClient.get<Exam[]>(`candidate/exam${query}`);
  }

  async start(examId: string, data: StartExamRequest): Promise<StartExamResponse> {  
    return httpClient.post(`candidate/exam/${examId}`, data);
  }

  async update(examId: string, data: ExamUpdateRequest): Promise<void> {  
    return httpClient.put(`candidate/exam/${examId}`, data);
  }
}

export const examService = new ExamService();
