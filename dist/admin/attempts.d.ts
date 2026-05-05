import type { Attempt, AttemptUpdate } from "../types.js";
export declare class AttemptService {
    list(universityId?: string): Promise<Attempt[]>;
    update(id: string, data: Partial<AttemptUpdate>): Promise<Attempt>;
    retry(id: string): Promise<Attempt>;
    delete(id: string): Promise<Attempt>;
}
export declare const attemptService: AttemptService;
