// Re-export all types from admin (they're the same in both modules)
export type {
  JsonApiRelationshipData,
  JsonApiRelationship,
  JsonApiResource,
  JsonApiResponse,
  ClientOptions,
  Candidate,
  University,
  UniversityUpdate,
  Exam,
  Course,
  User,
  LoginResponse,
} from "./types.js";

// Re-export client functionality from admin
export { HttpClient, httpClient, setBaseUrl } from "./client.js";
export { HttpClient as AppHttpClient, httpClient as appHttpClient, setBaseUrl as appSetBaseUrl, setAppToken } from "./client.js";

// Re-export admin services (main services)
export { AuthService, authService, authService as authApi } from "./admin/auth.js";
export { CandidateService, candidateService, candidateService as candidateApi } from "./admin/candidates.js";
export { UniversityService, universityService, universityService as universityApi } from "./admin/universities.js";
export { ExamService, examService, examService as examApi } from "./admin/exams.js";
export { CourseService, courseService, courseService as courseApi } from "./admin/courses.js";
export { UserService, userService, userService as userApi } from "./admin/users.js";

// Re-export app services (with app prefix to avoid conflicts)
export { CandidateService as AppCandidateService, candidateService as appCandidateService, candidateService as appCandidateApi } from "./app/candidates.js";
export { UniversityService as AppUniversityService, universityService as appUniversityService, universityService as appUniversityApi } from "./app/universities.js";
export { ExamService as AppExamService, examService as appExamService, examService as appExamApi } from "./app/exams.js";
export { CourseService as AppCourseService, courseService as appCourseService, courseService as appCourseApi } from "./app/courses.js";

// Import modules to ensure they're loaded
import "./admin.js";
import "./app.js";
