export type { JsonApiRelationshipData, JsonApiRelationship, JsonApiResource, JsonApiResponse, Candidate, University, UniversityUpdate, Exam, Course, User, LoginResponse, } from "./admin/types";
export { HttpClient, httpClient, setBaseUrl } from "./admin/client";
export { AuthService, authService, authService as authApi } from "./admin/auth";
export { CandidateService, candidateService, candidateService as candidateApi } from "./admin/candidates";
export { UniversityService, universityService, universityService as universityApi } from "./admin/universities";
export { ExamService, examService, examService as examApi } from "./admin/exams";
export { CourseService, courseService, courseService as courseApi } from "./admin/courses";
export { UserService, userService, userService as userApi } from "./admin/users";
