import { useEffect } from "react";
import { Link } from "react-router";
import { useInView } from "react-intersection-observer";

import { Character } from "@/types/character";

import { useCharacters } from "@/hooks/useCharacters";

export const CharacterList = () => {
  // const navigate = useNavigate();
  const { ref, inView } = useInView();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useCharacters();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (status === "pending") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Error: {error?.message}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data.pages.flatMap((page) =>
          page.results.map((character: Character) => (
            <Link
              to={`/characters/${character.id}`}
              key={character.id}
              // onClick={() => navigate(`/characters/${character.id}`)}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-2 right-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      character.status === "Alive"
                        ? "bg-green-100 text-green-800"
                        : character.status === "Dead"
                        ? "bg-red-100 text-red-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {character.status}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold mb-2 text-gray-800">
                  {character.name}
                </h2>
                <div className="space-y-2 text-gray-600">
                  <p className="flex items-center">
                    <span className="font-semibold mr-2">Species:</span>
                    {character.species}
                  </p>
                  <p className="flex items-center">
                    <span className="font-semibold mr-2">Gender:</span>
                    {character.gender}
                  </p>
                  <p className="flex items-center">
                    <span className="font-semibold mr-2">Origin:</span>
                    {character.origin.name}
                  </p>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
      <div ref={ref} className="h-20 flex justify-center items-center">
        {isFetchingNextPage && (
          <div className="flex items-center space-x-2">
            <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
            <span className="text-gray-600">Loading more characters...</span>
          </div>
        )}
      </div>
    </div>
  );
};
