import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import {
  getCharacters,
  getCharacterById,
  getMultipleCharacters,
} from "@/router/character";
import { CharactersResponse, Character } from "@/types/character";

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
    enabled: !!ids,
  });
};
