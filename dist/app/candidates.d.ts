import type { LoginResponse } from "../admin.js";
import type { Candidate, CandidateRegister, LoginRequest, MeResponse, ValidateOtpRequest } from "../types.js";
export declare class CandidateService {
    create(data: Omit<CandidateRegister, "id">): Promise<Candidate>;
    login(data: LoginRequest): Promise<any>;
    validateOtp(data: ValidateOtpRequest): Promise<LoginResponse | any>;
    me(): Promise<MeResponse | any>;
    logout(): Promise<void>;
}
export declare const candidateService: CandidateService;
