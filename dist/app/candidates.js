import { httpClient } from "../client.js";
export class CandidateService {
    async create(data) {
        return httpClient.post("candidate/register", data);
    }
    async loginLink(token, university_id) {
        return httpClient.post("candidate/auth/login-link", {
            token, university_id
        });
    }
    async login(data) {
        return httpClient.post("candidate/auth/login", data);
    }
    async validateOtp(data) {
        return httpClient.post("candidate/auth/login/verify", data);
    }
    async me() {
        return httpClient.get("candidate/me");
    }
    async logout() {
        return httpClient.postRaw("candidate/me/logout", {});
    }
}
export const candidateService = new CandidateService();
