import { Link, useParams } from "react-router";
import { useLocation } from "@/hooks/useLocation";
import { useMultipleCharacters } from "@/hooks/useCharacters";

export function LocationDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: location, isLoading, error } = useLocation(Number(id));

  const characterIds = (location?.residents ?? [])
    .map((url: string) => url.split("/").pop())
    .filter((id: string | undefined): id is string => id !== undefined)
    .map(Number);

  const {
    data: characters,
    isLoading: isCharactersLoading,
    error: charactersError,
  } = useMultipleCharacters(characterIds);

  if (isLoading || isCharactersLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || charactersError || !location) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">
          Error:{" "}
          {error?.message || charactersError?.message || "Location not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            {location.name}
          </h1>
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-24">Type:</span>
              <span className="text-gray-600">{location.type}</span>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-gray-700 w-24">
                Dimension:
              </span>
              <span className="text-gray-600">{location.dimension}</span>
            </div>
          </div>
        </div>
        <div className="p-8 border-t">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Residents</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {characters?.map((character) => (
              <Link
                key={character.id}
                to={`/characters/${character.id}`}
                className="bg-gray-50 p-4 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="w-12 h-12 rounded-full"
                  />
                  <span className="text-sm font-medium text-gray-900">
                    {character.name}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
