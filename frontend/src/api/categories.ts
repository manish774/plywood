import apiClient, { USE_MOCK } from "./client";
import { mockApi } from "../mock/mockData";
import type { Category, CategoryInput, DeleteResponse } from "../types/models";

export async function listCategories(): Promise<Category[]> {
  if (USE_MOCK) return mockApi.listCategories();
  const { data } = await apiClient.get<Category[]>("/categories");
  return data;
}

export async function getCategory(id: string): Promise<Category> {
  if (USE_MOCK) return mockApi.getCategory(id);
  const { data } = await apiClient.get<Category>(`/categories/${id}`);
  return data;
}

export async function createCategory(payload: CategoryInput): Promise<Category> {
  if (USE_MOCK) return mockApi.createCategory(payload);
  const { data } = await apiClient.post<Category>("/categories", payload);
  return data;
}

export async function updateCategory(id: string, payload: Partial<CategoryInput>): Promise<Category> {
  if (USE_MOCK) return mockApi.updateCategory(id, payload);
  const { data } = await apiClient.put<Category>(`/categories/${id}`, payload);
  return data;
}

export async function deleteCategory(id: string): Promise<DeleteResponse> {
  if (USE_MOCK) return mockApi.deleteCategory(id);
  const { data } = await apiClient.delete<DeleteResponse>(`/categories/${id}`);
  return data;
}
