import { useParams } from "react-router";
import { useCharacter } from "@/hooks/useCharacters";

export function CharacterDetail() {
  const { id } = useParams<{ id: string }>();
  const { data: character, isLoading, error } = useCharacter(Number(id));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !character) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">
          Error: {error?.message || "Character not found"}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={character.image}
              alt={character.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 md:w-1/2">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">
              {character.species}
            </div>
            <h1 className="mt-2 text-3xl font-bold text-gray-900">
              {character.name}
            </h1>
            <div className="mt-4 space-y-4">
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-24">
                  Status:
                </span>
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
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-24">
                  Gender:
                </span>
                <span className="text-gray-600">{character.gender}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-24">
                  Origin:
                </span>
                <span className="text-gray-600">{character.origin.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-24">
                  Location:
                </span>
                <span className="text-gray-600">{character.location.name}</span>
              </div>
              <div className="flex items-center">
                <span className="font-semibold text-gray-700 w-24">Type:</span>
                <span className="text-gray-600">
                  {character.type || "Unknown"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
