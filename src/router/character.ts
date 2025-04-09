import api from "@/utils/api";
import { Character, CharactersResponse } from "@/types/character";

export const getCharacters = async (
  page: number = 1
): Promise<CharactersResponse> => {
  const response = await api.get(`/character?page=${page}`);
  return response.data;
};

export const getCharacterById = async (id: number): Promise<Character> => {
  const response = await api.get(`/character/${id}`);
  return response.data;
};
