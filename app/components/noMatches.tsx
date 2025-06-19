import type { FC } from "react";

export const NoMatches: FC<{
  search: string;
  setSearch: (search: string) => void;
}> = ({ search, setSearch }) => {
  return (
    <section className="mt-4 p-6 bg-red-200 text-center rounded inset-shadow-sm inset-shadow-red-500/50">
      <div className="mb-2 text-black">
        <i className="bi-emoji-frown-fill me-1" /> no leads found for "{search}"
      </div>
      {search && (
        <button
          onClick={() => {
            setSearch("");
          }}
          className="shadow-md/50  px-4 py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          clear search to see all leads
        </button>
      )}
    </section>
  );
};
