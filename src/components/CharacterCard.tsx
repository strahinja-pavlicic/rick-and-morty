import { Link } from "react-router";
import { Character } from "@/types/character";

interface CharacterCardProps {
  character: Character;
}

export const CharacterCard = ({ character }: CharacterCardProps) => {
  return (
    <Link
      to={`/character/${character.id}`}
      key={character.id}
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
  );
};
