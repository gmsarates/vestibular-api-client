// Client
export { HttpClient, httpClient, setBaseUrl, setAppToken } from "./client.js";
// Services
export { CandidateService, candidateService, candidateService as appCandidateApi } from "./app/candidates.js";
export { AppUniversityService, appUniversityService, appUniversityService as appUniversityApi } from "./app/universities.js";
export { ExamService, examService, examService as appExamApi } from "./app/exams.js";
export { CourseService, courseService, courseService as appCourseApi } from "./app/courses.js";
