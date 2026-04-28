// Types
export type {
  JsonApiRelationshipData,
  JsonApiRelationship,
  JsonApiResource,
  JsonApiResponse,
  Candidate,
  University,
  UniversityUpdate,
  Exam,
  Course,
  User,
  LoginResponse,
} from "./types.js";

// Client
export { HttpClient, httpClient, setBaseUrl } from "./client.js";

// Services
export { AuthService, authService, authService as authApi } from "./admin/auth.js";
export { CandidateService, candidateService, candidateService as candidateApi } from "./admin/candidates.js";
export { UniversityService, universityService, universityService as universityApi } from "./admin/universities.js";
export { ExamService, examService, examService as examApi } from "./admin/exams.js";
export { CourseService, courseService, courseService as courseApi } from "./admin/courses.js";
export { UserService, userService, userService as userApi } from "./admin/users.js";
