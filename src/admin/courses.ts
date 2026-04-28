import { httpClient } from "../client.js";
import type { Course } from "../types.js";

export class CourseService {
  async list(): Promise<Course[]> {
    return httpClient.get<Course[]>("admin/course");
  }

  async create(data: Omit<Course, "id">): Promise<Course> {
    return httpClient.post<Course>("admin/course", data);
  }

  async update(id: string, data: Partial<Course>): Promise<Course> {
    return httpClient.put<Course>(`admin/course/${id}`, data);
  }

  async delete(id: string): Promise<void> {
    return httpClient.delete(`admin/course/${id}`);
  }
}

export const courseService = new CourseService();
