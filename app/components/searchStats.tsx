import type { FC } from "react";

export const SearchStats: FC<{
  search: string;
  filteredUsersCount: number;
  totalUsers: number;
}> = ({ search, filteredUsersCount, totalUsers }) => {
  return (
    <section className="p-3 rounded bg-blue-200 inset-shadow-sm inset-shadow-blue-500/50">
      <div className="text-black">
        {search ? (
          <span>
            {filteredUsersCount}/{totalUsers} lead
            {filteredUsersCount !== 1 ? "s" : ""} matching "{search}"
          </span>
        ) : (
          <span className="text-black">
            <i className="bi-people" />
            {totalUsers >= 1 ? `${totalUsers} leads shown` : "Only one lead"}
          </span>
        )}
      </div>
    </section>
  );
};
