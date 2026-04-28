export type ClientOptions = {
  baseUrl: string;
};

// JSON:API Types
export type JsonApiRelationshipData = { id: string; type: string };

export type JsonApiRelationship = {
  data: JsonApiRelationshipData | JsonApiRelationshipData[] | null;
};

export type JsonApiResource = {
  id: string;
  type: string;
  attributes?: Record<string, unknown>;
  relationships?: Record<string, JsonApiRelationship>;
};

export type JsonApiResponse = {
  data: JsonApiResource | JsonApiResource[];
  included?: JsonApiResource[];
};

// Domain Types
export interface Candidate {
  id: string;
  university_id: string;
  name: string;
  document: string;
  email: string;
  phone: string;
}

export interface University {
  id: string;
  name: string;
  slug: string;
  courses?: Course[];
}

export type UniversityUpdate = {
  name?: string;
  slug?: string;
  courses?: string[];
};

export interface Exam {
  id: string;
  university_id: string;
  name: string;
  theme: string;
  description: string;
  due_date: string;
  duration: number;
  min_words: number;
  max_words: number;
  can_retry: boolean;
  active: boolean;
}

export interface Course {
  id: string;
  name: string;
  active: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  relationships?: {
    university?: {
      data: { id: string; type: string } | null;
    };
  };
  university?: any;
}

export interface LoginResponse {
  token: string;
  expires: string;
}

export interface LoginRequest {
  document: string;
  university_id: string;
}

export interface ValidateOtpRequest {
  document: string;
  code: string;
  university_id: string;
}

export interface MeResponse {
  document: string; 
  email: string; 
  name: string; 
  phone: string; 
}