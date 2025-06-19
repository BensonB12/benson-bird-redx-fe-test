import type { FC } from "react";

export const SearchBar: FC<{
  search: string;
  setSearch: (value: string) => void;
}> = ({ search, setSearch }) => {
  return (
    <div>
      <div className="flex items-center gap-2 mt-2">
        <div className="relative w-full max-w-xs outline-none rounded border-none">
          <i className="bi-search absolute left-3 top-1/2 -translate-y-1/2 text-white pointer-events-none" />
          <input
            type="text"
            placeholder=" type to search the leads..."
            value={search}
            maxLength={25}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-black text-white w-full px-3 py-2 pl-9 rounded shadow-md/50 
             focus:outline-none focus:ring-0 focus:border-none"
          />
        </div>
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="shadow-md/50 rounded px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
          >
            clear
          </button>
        )}
      </div>
    </div>
  );
};
