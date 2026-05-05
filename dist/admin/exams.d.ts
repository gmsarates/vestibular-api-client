import type { Exam, ExamUpdate } from "../types.js";
export declare class ExamService {
    list(universityId?: string): Promise<Exam[]>;
    create(data: Omit<Exam, "id">): Promise<Exam>;
    update(id: string, data: Partial<ExamUpdate>): Promise<Exam>;
    delete(id: string): Promise<void>;
}
export declare const examService: ExamService;
