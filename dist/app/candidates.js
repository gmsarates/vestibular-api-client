import { httpClient } from "./client";
export class CandidateService {
    async create(data) {
        return httpClient.post("admin/candidate", data);
    }
    async login(data) {
        return httpClient.post("candidate/auth/login", data);
    }
    async validateOtp(data) {
        return httpClient.post("candidate/auth/login/verify", data);
    }
}
export const candidateService = new CandidateService();
