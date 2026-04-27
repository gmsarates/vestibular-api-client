"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBaseUrl = exports.userApi = exports.userService = exports.UserService = exports.courseApi = exports.courseService = exports.CourseService = exports.examApi = exports.examService = exports.ExamService = exports.universityApi = exports.universityService = exports.UniversityService = exports.candidateApi = exports.candidateService = exports.CandidateService = exports.authApi = exports.authService = exports.AuthService = exports.httpClient = exports.HttpClient = void 0;
// Client
var client_1 = require("./client");
Object.defineProperty(exports, "HttpClient", { enumerable: true, get: function () { return client_1.HttpClient; } });
Object.defineProperty(exports, "httpClient", { enumerable: true, get: function () { return client_1.httpClient; } });
const client_2 = require("./client");
// Services
var auth_1 = require("./auth");
Object.defineProperty(exports, "AuthService", { enumerable: true, get: function () { return auth_1.AuthService; } });
Object.defineProperty(exports, "authService", { enumerable: true, get: function () { return auth_1.authService; } });
Object.defineProperty(exports, "authApi", { enumerable: true, get: function () { return auth_1.authService; } });
var candidates_1 = require("./candidates");
Object.defineProperty(exports, "CandidateService", { enumerable: true, get: function () { return candidates_1.CandidateService; } });
Object.defineProperty(exports, "candidateService", { enumerable: true, get: function () { return candidates_1.candidateService; } });
Object.defineProperty(exports, "candidateApi", { enumerable: true, get: function () { return candidates_1.candidateService; } });
var universities_1 = require("./universities");
Object.defineProperty(exports, "UniversityService", { enumerable: true, get: function () { return universities_1.UniversityService; } });
Object.defineProperty(exports, "universityService", { enumerable: true, get: function () { return universities_1.universityService; } });
Object.defineProperty(exports, "universityApi", { enumerable: true, get: function () { return universities_1.universityService; } });
var exams_1 = require("./exams");
Object.defineProperty(exports, "ExamService", { enumerable: true, get: function () { return exams_1.ExamService; } });
Object.defineProperty(exports, "examService", { enumerable: true, get: function () { return exams_1.examService; } });
Object.defineProperty(exports, "examApi", { enumerable: true, get: function () { return exams_1.examService; } });
var courses_1 = require("./courses");
Object.defineProperty(exports, "CourseService", { enumerable: true, get: function () { return courses_1.CourseService; } });
Object.defineProperty(exports, "courseService", { enumerable: true, get: function () { return courses_1.courseService; } });
Object.defineProperty(exports, "courseApi", { enumerable: true, get: function () { return courses_1.courseService; } });
var users_1 = require("./users");
Object.defineProperty(exports, "UserService", { enumerable: true, get: function () { return users_1.UserService; } });
Object.defineProperty(exports, "userService", { enumerable: true, get: function () { return users_1.userService; } });
Object.defineProperty(exports, "userApi", { enumerable: true, get: function () { return users_1.userService; } });
// For direct access if needed
const setBaseUrl = (url) => client_2.httpClient.setBaseUrl(url);
exports.setBaseUrl = setBaseUrl;
