"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userService = exports.UserService = void 0;
const client_1 = require("./client");
class UserService {
    async list(universityId) {
        const query = universityId
            ? `?include=university&university_id=${universityId}`
            : "?include=university";
        return client_1.httpClient.get(`admin/user${query}`);
    }
    async create(data) {
        return client_1.httpClient.post("admin/user", data);
    }
    async update(id, data) {
        return client_1.httpClient.put(`admin/user/${id}`, data);
    }
    async delete(id) {
        return client_1.httpClient.delete(`admin/user/${id}`);
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
