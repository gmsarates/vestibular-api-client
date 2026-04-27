import type { LoginResponse } from "../admin.js";
import type { Candidate, LoginRequest, ValidateOtpRequest } from "./types.js";
export declare class CandidateService {
    create(data: Omit<Candidate, "id">): Promise<Candidate>;
    login(data: LoginRequest): Promise<any>;
    validateOtp(data: ValidateOtpRequest): Promise<LoginResponse | any>;
}
export declare const candidateService: CandidateService;
