import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { getCharacters, getCharacterById } from "@/router/character";
import { CharactersResponse, Character } from "@/types/character";

// Hook for paginated/infinite list
export const useCharacters = () => {
  return useInfiniteQuery<CharactersResponse>({
    queryKey: ["characters"],
    queryFn: ({ pageParam = 1 }) => getCharacters(pageParam as number),
    getNextPageParam: (lastPage) => {
      if (lastPage.info.next) {
        return lastPage.info.next.split("=")[1];
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
