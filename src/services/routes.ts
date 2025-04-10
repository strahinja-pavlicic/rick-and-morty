import api from "@/utils/api";

import { Episode } from "@/types/episode";
import { Location } from "@/types/location";
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

export const getMultipleCharacters = async (
  ids: number[]
): Promise<Character[]> => {
  const response = await api.get(`/character/${ids}`);
  return response.data;
};

export const getEpisodeById = async (id: number): Promise<Episode> => {
  const response = await api.get(`/episode/${id}`);
  return response.data;
};

export const getLocationById = async (id: number): Promise<Location> => {
  const response = await api.get(`/location/${id}`);
  return response.data;
};
