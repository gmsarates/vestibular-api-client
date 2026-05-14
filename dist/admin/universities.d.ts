import type { University, UniversityUpdate, UniversityUpdateCourses } from "../types.js";
export declare class UniversityService {
    list(): Promise<University[]>;
    create(data: Omit<University, "id">): Promise<University>;
    update(id: string, data: UniversityUpdate): Promise<University>;
    updateCourses(id: string, data: UniversityUpdateCourses): Promise<University>;
    delete(id: string): Promise<void>;
}
export declare const universityService: UniversityService;
