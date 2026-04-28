import type { Exam } from "../types.js";
export declare class ExamService {
    list(universityId?: string): Promise<Exam[]>;
    create(data: Omit<Exam, "id">): Promise<Exam>;
    update(id: string, data: Partial<Exam>): Promise<Exam>;
    delete(id: string): Promise<void>;
}
export declare const examService: ExamService;
