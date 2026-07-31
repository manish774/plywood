import apiClient, { USE_MOCK } from "./client";
import { mockApi } from "../mock/mockData";

export async function listCategories() {
  if (USE_MOCK) return mockApi.listCategories();
  const { data } = await apiClient.get("/categories");
  return data;
}

export async function getCategory(id) {
  if (USE_MOCK) return mockApi.getCategory(id);
  const { data } = await apiClient.get(`/categories/${id}`);
  return data;
}

export async function createCategory(payload) {
  if (USE_MOCK) return mockApi.createCategory(payload);
  const { data } = await apiClient.post("/categories", payload);
  return data;
}

export async function updateCategory(id, payload) {
  if (USE_MOCK) return mockApi.updateCategory(id, payload);
  const { data } = await apiClient.put(`/categories/${id}`, payload);
  return data;
}

export async function deleteCategory(id) {
  if (USE_MOCK) return mockApi.deleteCategory(id);
  const { data } = await apiClient.delete(`/categories/${id}`);
  return data;
}
