import type { Candidate } from "./types";
export declare class CandidateService {
    list(universityId?: string): Promise<Candidate[]>;
    create(data: Omit<Candidate, "id">): Promise<Candidate>;
    update(id: string, data: Partial<Candidate>): Promise<Candidate>;
    delete(id: string): Promise<void>;
}
export declare const candidateService: CandidateService;
