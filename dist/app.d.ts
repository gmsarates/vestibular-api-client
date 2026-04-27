export type { JsonApiRelationshipData, JsonApiRelationship, JsonApiResource, JsonApiResponse, Candidate, University, UniversityUpdate, Exam, Course, User, LoginResponse, } from "./app/types";
export { HttpClient, httpClient, setBaseUrl, setAppToken } from "./app/client";
export { CandidateService, candidateService, candidateService as appCandidateApi } from "./app/candidates";
export { UniversityService, universityService, universityService as appUniversityApi } from "./app/universities";
export { ExamService, examService, examService as appExamApi } from "./app/exams";
export { CourseService, courseService, courseService as appCourseApi } from "./app/courses";
