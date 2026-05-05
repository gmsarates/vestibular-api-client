import { httpClient } from "../client.js";
export class ExamService {
    async list() {
        const query = "?include=university";
        return httpClient.get(`candidate/exam${query}`);
    }
    async start(examId, data) {
        return httpClient.post(`candidate/exam/${examId}`, data);
    }
    async update(examId, data) {
        return httpClient.put(`candidate/exam/${examId}`, data);
    }
    async submit(examId, data) {
        return httpClient.post(`candidate/exam/${examId}/submit`, data);
    }
    async info(attemptId) {
        return httpClient.get(`candidate/exam/${attemptId}`);
    }
}
export const examService = new ExamService();
