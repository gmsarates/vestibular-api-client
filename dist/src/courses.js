"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseService = exports.CourseService = void 0;
const client_1 = require("./client");
class CourseService {
    async list() {
        return client_1.httpClient.get("admin/course");
    }
    async create(data) {
        return client_1.httpClient.post("admin/course", data);
    }
    async update(id, data) {
        return client_1.httpClient.put(`admin/course/${id}`, data);
    }
    async delete(id) {
        return client_1.httpClient.delete(`admin/course/${id}`);
    }
}
exports.CourseService = CourseService;
exports.courseService = new CourseService();
