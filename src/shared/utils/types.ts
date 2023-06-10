// import User from '../models/User';
// import Test from '../models/Test';
// import TestResult from '../models/TestResult';
// import Course from '../models/Course';
// import CourseEnrollment from '../models/CourseEnrollment';

// export type ApiResponse<T> = {
//   data: T;
// };

// export type UserApiResponse = ApiResponse<User>;

// export type TestApiResponse = ApiResponse<Test>;

// export type TestResultApiResponse = ApiResponse<TestResult>;

// export type CourseApiResponse = ApiResponse<Course>;

// export type CourseEnrollmentApiResponse = ApiResponse<CourseEnrollment>;

export type UserRole = 'STUDENT' | 'TEACHER';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: string;
  tests: TestResult[];
  enrollments: CourseEnrollment[];
}

export interface Test {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  results: TestResult[];
  course?: Course;
  courseId?: number;
}

export interface TestResult {
  id: number;
  result: number;
  createdAt: string;
  testId: number;
  userId: number;
  test: Test;
  user: User;
}

export interface Course {
  id: number;
  name: string;
  description: string;
  credits: number;
  createdAt: string;
  tests: Test[];
  enrollments: CourseEnrollment[];
}

export interface CourseEnrollment {
  id: number;
  createdAt: string;
  courseId: number;
  userId: number;
  user: User;
  course: Course;
}

export interface ApiResponse<T = any> {
  data: T;
}
