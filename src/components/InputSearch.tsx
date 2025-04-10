import { useState, useMemo, useEffect } from "react";
import { debounce } from "lodash";

interface InputSearchProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const InputSearch = ({
  onSearch,
  placeholder = "Search...",
}: InputSearchProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const debouncedSearch = useMemo(
    () =>
      debounce((query: string) => {
        onSearch(query);
      }, 500),
    [onSearch]
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    debouncedSearch(query);
  };

  // Cleanup debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  return (
    <div className="w-full max-w-md mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>
    </div>
  );
};
