import { httpClient } from "./client";
export class UniversityService {
    async list() {
        return httpClient.get("admin/university?include=courses,exams");
    }
    async create(data) {
        return httpClient.post("admin/university", data);
    }
    async update(id, data) {
        return httpClient.put(`admin/university/${id}`, data);
    }
    async delete(id) {
        return httpClient.delete(`admin/university/${id}`);
    }
}
export const universityService = new UniversityService();
