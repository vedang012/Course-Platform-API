import apiClient from './apiClient';
import { RegisterRequest, LoginRequest, JwtResponse } from './types';

export const register = async (data: RegisterRequest): Promise<JwtResponse> => {
  const response = await apiClient.post<JwtResponse>('/api/auth/register', data);
  return response.data;
};

export const login = async (data: LoginRequest): Promise<JwtResponse> => {
  const response = await apiClient.post<JwtResponse>('/api/auth/login', data);
  return response.data;
};
