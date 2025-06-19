import { useState, useEffect } from "react";
import redxLogo from "./../assets/redx_logo.png";

export default function Home() {
  const [data, setData] = useState<any>([]);
  const [loading, setLoading] = useState<any>(true);
  const [error, setError] = useState<any>(null);
  const [search, setSearch] = useState<any>("");
  const [count, setCount] = useState<any>(0);
  const [filteredData, setFilteredData] = useState<any>([]);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/users?client=true");
        const result = await response.json();

        if (response.ok) {
          setData(result.users);
          setCount(result.users.length);
          setFilteredData(result.users);
        } else {
          setError("Failed");
        }
      } catch (e) {
        setError("Error");
      }
      setLoading(false);
    })();
  }, []);

  const doFilter = (searchTerm: any) => {
    if (!searchTerm || searchTerm === "") {
      setFilteredData(data);
    } else {
      let results: any = [];
      for (let i = 0; i < data.length; i++) {
        const user = data[i];
        if (
          user.name &&
          user.name.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        ) {
          results.push(user);
        } else if (
          user.email &&
          user.email.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1
        ) {
          results.push(user);
        }
      }
      setFilteredData(results);
    }
  };

  useEffect(() => {
    doFilter(search);
  });

  if (loading) {
    return (
      <main className="p-5 bg-white min-h-screen">
        <section className="p-4 bg-primary inset-shadow-sm inset-shadow-blue-900/50 rounded">
          <h2 className="font-serif text-white text-2xl font-bold">
            LOADING LEADS...
          </h2>
          <p className="text-xs text-zinc-200">Thank you for being patient</p>
        </section>
      </main>
    );
  }

  if (error) {
    console.log(error);
    return (
      <main className="p-5 bg-white min-h-screen">
        <section className="text-center p-6 bg-red-600 text-white rounded inset-shadow-sm inset-shadow-red-900/50">
          <h2 className="text-xl font-semibold">
            <i className="bi-exclamation-triangle me-1" />
            Oops! Something on our side went wrong
            <i className="bi-exclamation-triangle ms-1" />
          </h2>
          <button
            onClick={() => {
              setError(null);
              setLoading(true);
              window.location.reload();
            }}
            className="mt-4 px-4 py-2 text-red-100 bg-zinc-600 hover:bg-zinc-700 rounded shadow-md/50 "
          >
            click me to try again
          </button>
        </section>
      </main>
    );
  }

  if (data.length <= 0)
    return (
      <main className="p-5 bg-white min-h-screen">
        <section className="text-center p-6 bg-red-600 text-white inset-shadow-sm inset-shadow-red-900/50 rounded">
          <h2 className="text-xl font-semibold">
            <i className="bi-emoji-frown-fill me-1" /> NO LEADS EXIST
          </h2>
        </section>
      </main>
    );

  return (
    <main className="flex flex-col min-h-screen bg-white">
      <div className="grow">
        <header className="md:grid bg-primary md:grid-cols-2 p-4">
          <img
            className="h-24 mx-auto md:mx-0"
            src={redxLogo}
            alt="REDX Logo"
          />
          <div className="font-serif my-auto">
            <h1 className="text-white text-xl font-bold">Full Stack Test</h1>
          </div>
          <p className="text-xs md:text-sm text-white col-span-2 mt-2">
            <i className="bi-pencil me-1" />
            Updated by Benson Bird
          </p>
        </header>

        <section className="p-4 space-y-4">
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

          <section className="p-3 rounded bg-blue-200 inset-shadow-sm inset-shadow-blue-500/50">
            <div className="text-black">
              {search ? (
                <span>
                  {filteredData.length}/{data.length} lead
                  {filteredData.length !== 1 ? "s" : ""} matching "{search}"
                </span>
              ) : (
                <span className="text-black">
                  <i className="bi-people" />
                  {data.length >= 1
                    ? `${data.length} leads shown`
                    : "Only one lead"}
                </span>
              )}
            </div>
          </section>

          <section className="mx-auto md:flex md:flex-wrap md:gap-4 justify-center">
            {filteredData.map((user: any, index: any) => {
              const nameColor = user.name ? "text-black" : "text-red-600";

              return (
                <article
                  className="bg-blue-50 m-4 rounded shadow-md/50 transition-shadow duration-200 hover:shadow-xl"
                  key={user.id + "_" + index}
                >
                  <a
                    href={`mailto:${user.email}`}
                    className="p-3 md:flex md:shadow-md/50 transition-shadow duration-200 hover:shadow-xl"
                  >
                    <div className="ps-4 md:w-56 md:pt-2">
                      <span
                        className={`text-center md:text-right font-semibold truncate ${nameColor}`}
                      >
                        <i className="bi-file-earmark-person me-1" />
                        {user.name || "Unknown"}
                      </span>
                      <div className="pe-4 md:w-68 md:pb-2 text-blue-700 truncate">
                        <i className="bi-envelope me-1" />
                        {user.email}
                      </div>
                    </div>
                    <div className="ps-4 md:w-40 md:p-2 text-black md:text-end rounded">
                      <i className="bi-calendar-check" /> last updated at
                      <span className="ms-1 md:ms-0 md:block">
                        {(() => {
                          try {
                            return new Date(
                              user.createdAt
                              // >= user.updatedAt
                              //   ? user.createdAt
                              //   : user.updatedAt
                            ).toLocaleDateString();
                          } catch {
                            return "Unknown";
                          }
                        })()}
                      </span>
                    </div>
                  </a>
                </article>
              );
            })}

            {filteredData.length === 0 && (
              <section className="p-6 bg-red-200 text-center rounded inset-shadow-sm inset-shadow-red-500/50">
                <div className="mb-2 text-black">
                  <i className="bi-emoji-frown-fill me-1" /> no leads found for
                  "{search}"
                </div>
                {search && (
                  <button
                    onClick={() => {
                      setSearch("");
                      doFilter("");
                    }}
                    className="shadow-md/50  px-4 py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >
                    clear search to see all leads
                  </button>
                )}
              </section>
            )}
          </section>
        </section>
      </div>
    </main>
  );
}
