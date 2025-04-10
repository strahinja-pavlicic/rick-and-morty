import { Link, useParams } from "react-router";

import { useEpisode } from "@/hooks/useRickAndMortyApi";
import { useMultipleCharacters } from "@/hooks/useRickAndMortyApi";

export function EpisodeDetail() {
  const { id } = useParams<{ id: string }>();
  const {
    data: episode,
    isLoading: isEpisodeLoading,
    error,
  } = useEpisode(Number(id));

  const characterIds = (episode?.characters ?? [])
    .map((url) => url.split("/").pop())
    .filter((id): id is string => id !== undefined)
    .map(Number);

  const {
    data: characters,
    isLoading: isCharactersLoading,
    error: charactersError,
  } = useMultipleCharacters(characterIds);

  if (isEpisodeLoading || isCharactersLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || charactersError || !episode) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">
          Error:{" "}
          {error?.message || charactersError?.message || "Episode not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden p-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Episode: {episode.name}
        </h1>
        <div className="text-gray-600 mb-6">
          {episode.episode} • Aired on {episode.air_date}
        </div>
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Characters
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {characters?.map((character) => (
                <Link
                  key={character.id}
                  to={`/character/${character.id}`}
                  className="bg-gray-50 rounded-lg overflow-hidden hover:bg-gray-100 transition-colors"
                >
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {character.name}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span
                        className={`inline-block w-2 h-2 rounded-full ${
                          character.status === "Alive"
                            ? "bg-green-500"
                            : character.status === "Dead"
                            ? "bg-red-500"
                            : "bg-gray-500"
                        }`}
                      />
                      <span className="text-sm text-gray-600">
                        {character.status} - {character.species}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
