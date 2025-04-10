import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getCharacters,
  getCharacterById,
  getMultipleCharacters,
  getEpisodeById,
  getLocationById,
} from "@/services/routes";

import { CharactersResponse, Character } from "@/types/character";
import { Episode } from "@/types/episode";
import { Location } from "@/types/location";

// Hook for paginated/infinite list
export const useCharacters = (searchQuery: string = "") => {
  return useInfiniteQuery<CharactersResponse>({
    queryKey: ["characters", searchQuery],
    queryFn: ({ pageParam = 1 }) =>
      getCharacters(pageParam as number, searchQuery),
    getNextPageParam: (lastPage) => {
      if (lastPage.info.next) {
        const url = new URL(lastPage.info.next);
        return parseInt(url.searchParams.get("page") || "1");
      }
      return undefined;
    },
    initialPageParam: 1,
    // staleTime: 1000 * 60 * 5, // 5 minutes cache
  });
};

// Hook for fetching a single character
export const useCharacter = (id: number) => {
  return useQuery<Character>({
    queryKey: ["character", id],
    queryFn: () => getCharacterById(id),
    enabled: !!id,
  });
};

// Hook for fetching multiple characters
export const useMultipleCharacters = (ids: number[]) => {
  return useQuery<Character[]>({
    queryKey: ["multiple-characters", ids],
    queryFn: () => getMultipleCharacters(ids),
    enabled: ids && ids.length > 0,
  });
};

// Hook for fetching a single episode
export const useEpisode = (id: number) => {
  return useQuery<Episode>({
    queryKey: ["episode", id],
    queryFn: () => getEpisodeById(id),
    enabled: !!id,
  });
};

// Hook for fetching a single location
export const useLocation = (id: number) => {
  return useQuery<Location>({
    queryKey: ["location", id],
    queryFn: () => getLocationById(id),
    enabled: !!id,
  });
};
