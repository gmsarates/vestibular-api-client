import type { Exam, ExamUpdateRequest } from "../types.js";
export declare class ExamService {
    list(): Promise<Exam[]>;
    start(examId: string): Promise<void>;
    update(examId: string, data: ExamUpdateRequest): Promise<void>;
}
export declare const examService: ExamService;
