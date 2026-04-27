"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.examService = exports.ExamService = void 0;
const client_1 = require("./client");
class ExamService {
    async list(universityId) {
        const query = universityId
            ? `?include=university&university_id=${universityId}`
            : "?include=university";
        return client_1.httpClient.get(`admin/exam${query}`);
    }
    async create(data) {
        return client_1.httpClient.post("admin/exam", data);
    }
    async update(id, data) {
        return client_1.httpClient.put(`admin/exam/${id}`, data);
    }
    async delete(id) {
        return client_1.httpClient.delete(`admin/exam/${id}`);
    }
}
exports.ExamService = ExamService;
exports.examService = new ExamService();
