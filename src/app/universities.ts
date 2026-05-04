import { httpClient } from "../client.js";
import type { University } from "../types.js";

export class AppUniversityService {
  async get(universityId?: string): Promise<University> {
    if (universityId) {
      return httpClient.get<University>(`candidate/university/${universityId}?include=courses,exams`);
    }

    return httpClient.get<University>(`candidate/university?include=courses,exams`);
  }
}

export const appUniversityService = new AppUniversityService();
