
import React from "react";
import { Search } from "lucide-react";

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  handleSearch: (e: React.FormEvent) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  searchQuery,
  setSearchQuery,
  handleSearch,
}) => {
  return (
    <div className="hidden md:flex flex-1 max-w-md mx-4">
      <form onSubmit={handleSearch} className="flex-1 relative">
        <input
          type="text"
          placeholder="Search for products..."
          className="w-full px-4 py-2 pl-10 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Search className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
      </form>
    </div>
  );
};

export default SearchBar;
