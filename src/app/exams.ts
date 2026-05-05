import { httpClient } from "../client.js";
import type { Exam, ExamSubmitRequest, ExamUpdateRequest, StartExamRequest, StartExamResponse } from "../types.js";

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

  async submit(examId: string, data: ExamSubmitRequest): Promise<void> {  
    return httpClient.post(`candidate/exam/${examId}/submit`, data);
  }

  async info(attemptId: string): Promise<Exam> {
    return httpClient.get<Exam>(`candidate/exam/${attemptId}`);
  }
}

export const examService = new ExamService();
