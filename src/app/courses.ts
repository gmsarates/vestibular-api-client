import { httpClient } from "../client.js";
import type { Course } from "../types.js";

export class CourseService {
  // async list(): Promise<Course[]> {
  //   return httpClient.get<Course[]>("admin/course");
  // }
}

export const courseService = new CourseService();
