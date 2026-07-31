import apiClient, { USE_MOCK } from "./client";
import { mockApi } from "../mock/mockData";

export async function listItems(categoryId) {
  if (USE_MOCK) return mockApi.listItems(categoryId);
  const { data } = await apiClient.get("/items", {
    params: categoryId ? { category: categoryId } : {},
  });
  return data;
}

export async function getItem(id) {
  if (USE_MOCK) return mockApi.getItem(id);
  const { data } = await apiClient.get(`/items/${id}`);
  return data;
}

export async function createItem(payload) {
  if (USE_MOCK) return mockApi.createItem(payload);
  const { data } = await apiClient.post("/items", payload);
  return data;
}

export async function updateItem(id, payload) {
  if (USE_MOCK) return mockApi.updateItem(id, payload);
  const { data } = await apiClient.put(`/items/${id}`, payload);
  return data;
}

export async function deleteItem(id) {
  if (USE_MOCK) return mockApi.deleteItem(id);
  const { data } = await apiClient.delete(`/items/${id}`);
  return data;
}
