import apiClient, { USE_MOCK } from "./client";
import { mockApi } from "../mock/mockData";
import type { Settings, SettingsInput } from "../types/models";

export async function getSettings(): Promise<Settings> {
  if (USE_MOCK) return mockApi.getSettings();
  const { data } = await apiClient.get<Settings>("/settings");
  return data;
}

export async function updateSettings(payload: SettingsInput): Promise<Settings> {
  if (USE_MOCK) return mockApi.updateSettings(payload);
  const { data } = await apiClient.put<Settings>("/settings", payload);
  return data;
}
