import apiClient, { USE_MOCK } from "./client";
import { mockApi } from "../mock/mockData";
import type { Item, ItemInput, DeleteResponse } from "../types/models";

export async function listItems(categoryId?: string): Promise<Item[]> {
  if (USE_MOCK) return mockApi.listItems(categoryId);
  const { data } = await apiClient.get<Item[]>("/items", {
    params: categoryId ? { category: categoryId } : {},
  });
  return data;
}

export async function getItem(id: string): Promise<Item> {
  if (USE_MOCK) return mockApi.getItem(id);
  const { data } = await apiClient.get<Item>(`/items/${id}`);
  return data;
}

export async function createItem(payload: ItemInput): Promise<Item> {
  if (USE_MOCK) return mockApi.createItem(payload);
  const { data } = await apiClient.post<Item>("/items", payload);
  return data;
}

export async function updateItem(id: string, payload: Partial<ItemInput>): Promise<Item> {
  if (USE_MOCK) return mockApi.updateItem(id, payload);
  const { data } = await apiClient.put<Item>(`/items/${id}`, payload);
  return data;
}

export async function deleteItem(id: string): Promise<DeleteResponse> {
  if (USE_MOCK) return mockApi.deleteItem(id);
  const { data } = await apiClient.delete<DeleteResponse>(`/items/${id}`);
  return data;
}
