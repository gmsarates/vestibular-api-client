import type { LoginResponse } from "../admin.js";
import { httpClient } from "../client.js";
import type { Candidate, LoginRequest, ValidateOtpRequest } from "../types.js";

export class CandidateService {
  async create(data: Omit<Candidate, "id">): Promise<Candidate> {
    return httpClient.post<Candidate>("admin/candidate", data);
  }

  async login(data: LoginRequest): Promise<any> {
    return httpClient.post<LoginRequest>("candidate/auth/login", data);
  }

  async validateOtp(data: ValidateOtpRequest): Promise<LoginResponse | any> {
    return httpClient.post<ValidateOtpRequest>("candidate/auth/login/verify", data);
  }
}

export const candidateService = new CandidateService();
