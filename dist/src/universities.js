"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.universityService = exports.UniversityService = void 0;
const client_1 = require("./client");
class UniversityService {
    async list() {
        return client_1.httpClient.get("admin/university?include=courses,exams");
    }
    async create(data) {
        return client_1.httpClient.post("admin/university", data);
    }
    async update(id, data) {
        return client_1.httpClient.put(`admin/university/${id}`, data);
    }
    async delete(id) {
        return client_1.httpClient.delete(`admin/university/${id}`);
    }
}
exports.UniversityService = UniversityService;
exports.universityService = new UniversityService();
