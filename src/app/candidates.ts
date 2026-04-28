import type { LoginResponse } from "../admin.js";
import { httpClient } from "../client.js";
import type { Candidate, LoginRequest, ValidateOtpRequest } from "../types.js";

export class CandidateService {
  async create(data: Omit<Candidate, "id">): Promise<Candidate> {
    return httpClient.post<Candidate>("candidate/register", data);
  }

  async login(data: LoginRequest): Promise<any> {
    return httpClient.post<LoginRequest>("candidate/auth/login", data);
  }

  async validateOtp(data: ValidateOtpRequest): Promise<LoginResponse | any> {
    return httpClient.post<ValidateOtpRequest>("candidate/auth/login/verify", data);
  }

  async logout(): Promise<void> {
    return httpClient.postRaw<void>("candidate/me/logout", {});
  }
}

export const candidateService = new CandidateService();
