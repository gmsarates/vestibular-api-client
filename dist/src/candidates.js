"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.candidateService = exports.CandidateService = void 0;
const client_1 = require("./client");
class CandidateService {
    async list(universityId) {
        const query = universityId
            ? `?include=university&university_id=${universityId}`
            : "?include=university";
        return client_1.httpClient.get(`admin/candidate${query}`);
    }
    async create(data) {
        return client_1.httpClient.post("admin/candidate", data);
    }
    async update(id, data) {
        return client_1.httpClient.put(`admin/candidate/${id}`, data);
    }
    async delete(id) {
        return client_1.httpClient.delete(`admin/candidate/${id}`);
    }
}
exports.CandidateService = CandidateService;
exports.candidateService = new CandidateService();
