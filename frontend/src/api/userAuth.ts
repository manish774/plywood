import { userApiClient, USE_MOCK, USER_TOKEN_KEY } from "./client";
import { mockApi } from "../mock/mockData";
import type { MessageResponse, User, VerifyOtpResponse } from "../types/models";

export async function register(name: string, email: string, phone: string): Promise<MessageResponse> {
  if (USE_MOCK) return mockApi.userRegister(name, email, phone);
  const { data } = await userApiClient.post<MessageResponse>("/auth/register", { name, email, phone });
  return data;
}

export async function login(email: string): Promise<MessageResponse> {
  if (USE_MOCK) return mockApi.userLogin(email);
  const { data } = await userApiClient.post<MessageResponse>("/auth/login", { email });
  return data;
}

export async function verifyOtp(email: string, otp: string): Promise<VerifyOtpResponse> {
  if (USE_MOCK) {
    const data = await mockApi.userVerifyOtp(email, otp);
    localStorage.setItem(USER_TOKEN_KEY, data.token);
    return data;
  }
  const { data } = await userApiClient.post<VerifyOtpResponse>("/auth/verify-otp", { email, otp });
  localStorage.setItem(USER_TOKEN_KEY, data.token);
  return data;
}

export async function resendOtp(email: string): Promise<MessageResponse> {
  if (USE_MOCK) return mockApi.userResendOtp(email);
  const { data } = await userApiClient.post<MessageResponse>("/auth/resend-otp", { email });
  return data;
}

export async function me(): Promise<User> {
  if (USE_MOCK) return mockApi.userMe();
  const { data } = await userApiClient.get<User>("/auth/me");
  return data;
}

export function logout(): void {
  localStorage.removeItem(USER_TOKEN_KEY);
}

export function getToken(): string | null {
  return localStorage.getItem(USER_TOKEN_KEY);
}

export function isAuthenticated(): boolean {
  return Boolean(getToken());
}

export { USER_TOKEN_KEY };
