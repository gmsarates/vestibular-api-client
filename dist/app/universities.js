import { httpClient } from "../client.js";
export class AppUniversityService {
    async get(universityId) {
        if (universityId) {
            return httpClient.get(`candidate/university/${universityId}?include=courses,exams`);
        }
        return httpClient.get(`candidate/university?include=courses,exams`);
    }
}
export const appUniversityService = new AppUniversityService();
