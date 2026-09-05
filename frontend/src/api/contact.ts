import apiClient, { userApiClient, USE_MOCK } from "./client";
import { mockApi } from "../mock/mockData";
import type { Contact, ContactInput } from "../types/models";

// Uses the user client so a logged-in shopper's query is auto-linked to
// their account (the backend accepts the Bearer token but doesn't require it).
export async function submitContact(payload: ContactInput): Promise<Contact> {
  if (USE_MOCK) return mockApi.submitContact(payload);
  const { data } = await userApiClient.post<Contact>("/contact", payload);
  return data;
}

export async function listMyInquiries(): Promise<Contact[]> {
  if (USE_MOCK) return mockApi.listMyInquiries();
  const { data } = await userApiClient.get<Contact[]>("/contact/mine");
  return data;
}

export async function listInquiries(): Promise<Contact[]> {
  if (USE_MOCK) return mockApi.listInquiries();
  const { data } = await apiClient.get<Contact[]>("/contact");
  return data;
}

export async function acknowledgeInquiry(id: string, message: string): Promise<Contact> {
  if (USE_MOCK) return mockApi.acknowledgeInquiry(id, message);
  const { data } = await apiClient.put<Contact>(`/contact/${id}/acknowledge`, { message });
  return data;
}
