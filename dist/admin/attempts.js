import { httpClient } from "../client.js";
export class AttemptService {
    async list(universityId) {
        const query = universityId
            ? `?include=candidate,exam,university&university_id=${universityId}`
            : "?include=candidate,exam,university";
        return httpClient.get(`admin/attempt${query}`);
    }
    async update(id, data) {
        return httpClient.put(`admin/attempt/${id}`, data);
    }
    async retry(id) {
        return httpClient.post(`admin/attempt/${id}/retry`, {});
    }
    async delete(id) {
        return httpClient.delete(`admin/attempt/${id}`);
    }
}
export const attemptService = new AttemptService();
