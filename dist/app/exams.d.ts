import type { Exam, ExamSubmitRequest, ExamUpdateRequest, StartExamRequest, StartExamResponse } from "../types.js";
export declare class ExamService {
    list(): Promise<Exam[]>;
    start(examId: string, data: StartExamRequest): Promise<StartExamResponse>;
    update(examId: string, data: ExamUpdateRequest): Promise<void>;
    submit(examId: string, data: ExamSubmitRequest): Promise<void>;
}
export declare const examService: ExamService;
