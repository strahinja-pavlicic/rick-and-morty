import { useInfiniteQuery } from "@tanstack/react-query";
import { getCharacters } from "@/router/character";
import { CharactersResponse } from "@/types/character";

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
  });
};
