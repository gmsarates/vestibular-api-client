import { httpClient } from "./client.js";
export class UserService {
    async list(universityId) {
        const query = universityId
            ? `?include=university&university_id=${universityId}`
            : "?include=university";
        return httpClient.get(`admin/user${query}`);
    }
    async create(data) {
        return httpClient.post("admin/user", data);
    }
    async update(id, data) {
        return httpClient.put(`admin/user/${id}`, data);
    }
    async delete(id) {
        return httpClient.delete(`admin/user/${id}`);
    }
}
export const userService = new UserService();
