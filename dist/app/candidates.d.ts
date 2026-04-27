import { LoginResponse } from "../admin";
import type { Candidate, LoginRequest, ValidateOtpRequest } from "./types";
export declare class CandidateService {
    create(data: Omit<Candidate, "id">): Promise<Candidate>;
    login(data: LoginRequest): Promise<any>;
    validateOtp(data: ValidateOtpRequest): Promise<LoginResponse | any>;
}
export declare const candidateService: CandidateService;
