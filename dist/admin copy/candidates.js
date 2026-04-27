import { httpClient } from "./client";
export class CandidateService {
    async list(universityId) {
        const query = universityId
            ? `?include=university&university_id=${universityId}`
            : "?include=university";
        return httpClient.get(`admin/candidate${query}`);
    }
    async create(data) {
        return httpClient.post("admin/candidate", data);
    }
    async update(id, data) {
        return httpClient.put(`admin/candidate/${id}`, data);
    }
    async delete(id) {
        return httpClient.delete(`admin/candidate/${id}`);
    }
}
export const candidateService = new CandidateService();
