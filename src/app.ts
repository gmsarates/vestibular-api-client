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
export { HttpClient, httpClient, setBaseUrl, setAppToken } from "./client.js";

// Services
export { CandidateService, candidateService, candidateService as appCandidateApi } from "./app/candidates.js";
export { UniversityService, universityService, universityService as appUniversityApi } from "./app/universities.js";
export { ExamService, examService, examService as appExamApi } from "./app/exams.js";
export { CourseService, courseService, courseService as appCourseApi } from "./app/courses.js";
