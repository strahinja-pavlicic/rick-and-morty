import api from "@/utils/api";
import { Character, CharactersResponse } from "@/types/character";

export const getCharacters = async (
  page: number = 1,
  searchQuery?: string
): Promise<CharactersResponse> => {
  const params: Record<string, unknown> = { page };
  if (searchQuery?.trim()) {
    params.name = searchQuery.trim();
  }
  const response = await api.get(`/character`, { params });
  return response.data;
};

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await api.get(`/character/${id}`);
  return response.data;
};
