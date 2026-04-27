import { httpClient } from "./client";
export class CourseService {
    async list() {
        return httpClient.get("admin/course");
    }
    async create(data) {
        return httpClient.post("admin/course", data);
    }
    async update(id, data) {
        return httpClient.put(`admin/course/${id}`, data);
    }
    async delete(id) {
        return httpClient.delete(`admin/course/${id}`);
    }
}
export const courseService = new CourseService();
