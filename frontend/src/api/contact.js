import apiClient, { USE_MOCK } from "./client";
import { mockApi } from "../mock/mockData";

export async function submitContact(payload) {
  if (USE_MOCK) return mockApi.submitContact(payload);
  const { data } = await apiClient.post("/contact", payload);
  return data;
}

export async function listInquiries() {
  if (USE_MOCK) return mockApi.listInquiries();
  const { data } = await apiClient.get("/contact");
  return data;
}
