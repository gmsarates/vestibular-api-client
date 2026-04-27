// Re-export client functionality from admin
export { HttpClient, httpClient, setBaseUrl } from "./admin/client";
export { HttpClient as AppHttpClient, httpClient as appHttpClient, setBaseUrl as appSetBaseUrl, setAppToken } from "./app/client";
// Re-export admin services (main services)
export { AuthService, authService, authService as authApi } from "./admin/auth";
export { CandidateService, candidateService, candidateService as candidateApi } from "./admin/candidates";
export { UniversityService, universityService, universityService as universityApi } from "./admin/universities";
export { ExamService, examService, examService as examApi } from "./admin/exams";
export { CourseService, courseService, courseService as courseApi } from "./admin/courses";
export { UserService, userService, userService as userApi } from "./admin/users";
// Re-export app services (with app prefix to avoid conflicts)
export { CandidateService as AppCandidateService, candidateService as appCandidateService, candidateService as appCandidateApi } from "./app/candidates";
export { UniversityService as AppUniversityService, universityService as appUniversityService, universityService as appUniversityApi } from "./app/universities";
export { ExamService as AppExamService, examService as appExamService, examService as appExamApi } from "./app/exams";
export { CourseService as AppCourseService, courseService as appCourseService, courseService as appCourseApi } from "./app/courses";
// Import modules to ensure they're loaded
import './admin';
import './app';
