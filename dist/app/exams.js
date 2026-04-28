import { httpClient } from "../client.js";
export class ExamService {
    async list() {
        // const query = universityId
        //   ? `?include=university&university_id=${universityId}`
        //   : "?include=university";
        const query = "?include=university";
        return httpClient.get(`candidate/exam${query}`);
    }
    async create(data) {
        return httpClient.post("admin/exam", data);
    }
    async update(id, data) {
        return httpClient.put(`admin/exam/${id}`, data);
    }
    async delete(id) {
        return httpClient.delete(`admin/exam/${id}`);
    }
}
export const examService = new ExamService();
