import type { University, UniversityUpdate } from "./types.js";
export declare class UniversityService {
    list(): Promise<University[]>;
    create(data: Omit<University, "id">): Promise<University>;
    update(id: string, data: UniversityUpdate): Promise<University>;
    delete(id: string): Promise<void>;
}
export declare const universityService: UniversityService;
