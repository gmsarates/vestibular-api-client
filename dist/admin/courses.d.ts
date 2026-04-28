import type { Course } from "../types.js";
export declare class CourseService {
    list(): Promise<Course[]>;
    create(data: Omit<Course, "id">): Promise<Course>;
    update(id: string, data: Partial<Course>): Promise<Course>;
    delete(id: string): Promise<void>;
}
export declare const courseService: CourseService;
