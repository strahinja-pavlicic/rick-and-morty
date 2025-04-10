import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { AxiosError } from "axios";

import { Character } from "@/types/character";
import { InputSearch } from "@/components/InputSearch";
import { CharacterCard } from "@/components/CharacterCard";
import { useCharacters } from "@/hooks/useRickAndMortyApi";

interface ErrorResponse {
  error: string;
}

export function Characters() {
  const { ref, inView } = useInView();
  const [searchQuery, setSearchQuery] = useState("");

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useCharacters(searchQuery);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <InputSearch onSearch={handleSearch} placeholder="Search characters..." />
      {status === "pending" ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : status === "error" ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <div className="text-red-500">
            {(error as AxiosError<ErrorResponse>)?.response?.data?.error ||
              error?.message ||
              "An error occurred"}
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.pages.flatMap((page) =>
              page.results.map((character: Character) => (
                <CharacterCard key={character.id} character={character} />
              ))
            )}
          </div>
          <div ref={ref} className="h-20 flex justify-center items-center">
            {isFetchingNextPage && (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
                <span className="text-gray-600">
                  Loading more characters...
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
