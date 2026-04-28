import { httpClient } from "../client.js";
export class ExamService {
    async list() {
        const query = "?include=university";
        return httpClient.get(`candidate/exam${query}`);
    }
    async start(examId) {
        return httpClient.post(`candidate/exam/${examId}`, {});
    }
    async update(examId, data) {
        return httpClient.put(`candidate/exam/${examId}`, data);
    }
}
export const examService = new ExamService();
