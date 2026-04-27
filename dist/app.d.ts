export type { JsonApiRelationshipData, JsonApiRelationship, JsonApiResource, JsonApiResponse, Candidate, University, UniversityUpdate, Exam, Course, User, LoginResponse, } from "./app/types.js";
export { HttpClient, httpClient, setBaseUrl, setAppToken } from "./app/client.js";
export { CandidateService, candidateService, candidateService as appCandidateApi } from "./app/candidates.js";
export { UniversityService, universityService, universityService as appUniversityApi } from "./app/universities.js";
export { ExamService, examService, examService as appExamApi } from "./app/exams.js";
export { CourseService, courseService, courseService as appCourseApi } from "./app/courses.js";
