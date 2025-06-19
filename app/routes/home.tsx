import { useState, useEffect, useRef } from "react";
import type { User } from "~/models/user";
import { useGetPeopleQuery } from "~/hooks/userHooks";
import { ErrorPage } from "~/components/errorPage";
import { EmptyLeadsPage } from "~/components/emptyLeadsPage";
import { LoadingPage } from "~/components/loadingPage";
import { UserCard } from "~/components/userCard";
import { NoMatches } from "~/components/noMatches";
import { SearchStats } from "~/components/searchStats";
import { SearchBar } from "~/components/searchBar";
import { RedxHeader } from "~/components/redxHeader";

// I'm not in love with the function sharing the file with the component,
// but this is the only file it will be used
const filterDownUsersCasingDoesNotMatter = (
  searchTerm: string,
  users: User[]
) => {
  if (!searchTerm || searchTerm === "") {
    return users;
  } else {
    const lowerSearch = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name?.toLowerCase().includes(lowerSearch) ||
        user.email?.toLowerCase().includes(lowerSearch)
    );
  }
};

export default function Home() {
  const { users, loading, error } = useGetPeopleQuery();
  const [search, setSearch] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const isMounted = useRef(false);

  useEffect(() => {
    // I think a good user feedback would have a spinner show while we are debouncing
    // their search input, but it might be a bit much
    const debounceHandler = setTimeout(() => {
      if (isMounted.current) {
        setFilteredUsers(filterDownUsersCasingDoesNotMatter(search, users));
      } else {
        setFilteredUsers(filterDownUsersCasingDoesNotMatter(search, users));
        isMounted.current = true;
      }
    }, 700);
    return () => clearTimeout(debounceHandler);
  }, [search, users]);

  if (loading) return <LoadingPage />;
  if (error) return <ErrorPage error={error} />;
  if (users.length <= 0) return <EmptyLeadsPage />;

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <div className="grow">
        <RedxHeader />

        <section className="p-4 space-y-4">
          <SearchBar search={search} setSearch={setSearch} />

          <SearchStats
            search={search}
            filteredUsersCount={filteredUsers.length}
            totalUsers={users.length}
          />

          <section className="mx-auto md:flex md:flex-wrap md:gap-4 justify-center">
            {filteredUsers.map((user: User, index: number) => {
              return <UserCard user={user} index={index} />;
            })}

            {filteredUsers.length === 0 && (
              <NoMatches search={search} setSearch={setSearch} />
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
