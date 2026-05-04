import type { University } from "../types.js";
export declare class AppUniversityService {
    get(universityId?: string): Promise<University>;
}
export declare const appUniversityService: AppUniversityService;
