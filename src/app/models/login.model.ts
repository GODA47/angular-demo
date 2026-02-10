import { ApiResponse } from "./api-response.model";

export type LoginResponse = ApiResponse<AuthResponse>;

export interface LoginRequest {
    username: string;
    password: string;
}

export interface AuthResponse{
    token: Token;
    user: User;
    permission: Permission;
}

export interface Token {
    accessToken: string;
    expiresInMsec: number;
    tokenType: string;
    refreshToken: string;
}

export interface User {
    name: string;
    email: string;
    ocCode: string;
    dateLastLogin: string | null;
}

export interface Permission {
    configuration_allowaccess: string;
    configuration_properties: string;
    systemparameter_allowaccess: string;
    systemparameter_properties: string;
    occode_allowaccess: string;
    occode_properties: string;
    administration_allowaccess: string;
    administration_properties: string;
} 