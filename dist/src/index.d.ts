export type { JsonApiRelationshipData, JsonApiRelationship, JsonApiResource, JsonApiResponse, Candidate, University, UniversityUpdate, Exam, Course, User, LoginResponse, } from "./types";
export { HttpClient, httpClient } from "./client";
export { AuthService, authService, authService as authApi } from "./auth";
export { CandidateService, candidateService, candidateService as candidateApi } from "./candidates";
export { UniversityService, universityService, universityService as universityApi } from "./universities";
export { ExamService, examService, examService as examApi } from "./exams";
export { CourseService, courseService, courseService as courseApi } from "./courses";
export { UserService, userService, userService as userApi } from "./users";
export declare const setBaseUrl: (url: string) => void;
