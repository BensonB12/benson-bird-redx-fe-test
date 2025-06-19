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
      <main className="p-5 bg-white h-screen">
        <section className="p-4 bg-primary rounded-md">
          <h2 className="font-serif text-white text-2xl font-bold">
            LOADING USERS...
          </h2>
          <p className="text-xs text-zinc-200">Thank you for being patient</p>
        </section>
      </main>
    );
  }

  if (error) {
    console.log(error);
    return (
      <main className="p-5 bg-white h-screen">
        <section className="text-center p-6 bg-red-600 text-white rounded-md">
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
            className="mt-4 px-4 py-2 text-red-100 bg-zinc-600 hover:bg-zinc-700 rounded"
          >
            click me to try again
          </button>
        </section>
      </main>
    );
  }

  if (data.length <= 0) return <span>😞 NO USERS EXIST</span>;

  return (
    <main className="bg-white h-screen">
      <header className="grid bg-primary grid-cols-2 p-4">
        <div>
          <img className="h-24" src={redxLogo} alt="REDX Logo" />
        </div>
        <div className="font-serif my-auto">
          <h1 className="text-white text-xl font-bold">Frontend Test</h1>
        </div>
        <p className="text-white text-sm col-span-2 mt-2">
          <i className="bi-pencil me-1" />
          Updated by Benson Bird
        </p>
      </header>

      <section className="p-4 space-y-4">
        <div>
          <div className="flex items-center gap-2 mt-2">
            <div className="relative w-full max-w-xs">
              <i className="bi-search absolute left-3 top-1/2 -translate-y-1/2 text-white text-sm pointer-events-none" />
              <input
                type="text"
                placeholder=" type to search the users..."
                value={search}
                maxLength={25}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-black rounded px-3 py-2 pl-9 text-white w-full"
              />
            </div>
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="rounded px-4 py-2 bg-blue-600 text-white hover:bg-blue-700"
              >
                CLEAR
              </button>
            )}
          </div>
        </div>

        <section className={`p-3 rounded bg-blue-200`}>
          <div className="text-black">
            {search ? (
              <span>
                {filteredData.length}/{data.length} user
                {filteredData.length !== 1 ? "s" : ""} matching "{search}"
              </span>
            ) : (
              <span className="text-black">
                <i className="bi-people" />
                {data.length >= 1
                  ? `${data.length} users shown`
                  : "Only one user"}
              </span>
            )}
          </div>
        </section>

        <section className="border-4 border-black bg-white rounded overflow-hidden">
          <header className="flex bg-blue-900 text-white font-bold text-sm">
            <div className="w-44 p-3 border-r border-white text-center bg-red-600">
              👤 NAME
            </div>
            <div className="w-56 p-3 border-r border-white text-center bg-blue-500">
              <i className="bi-envelope-fill me-1" />
              EMAIL
            </div>
            <div className="w-36 p-3 text-center bg-black">📅 CREATED</div>
          </header>

          {filteredData.map((user: any, index: any) => {
            const rowColor = index % 2 === 0 ? "bg-white" : "bg-blue-50";
            const nameColor = user.name ? "text-black" : "text-red-600";

            return (
              <article
                key={user.id + "_" + index}
                className={`flex border-b border-gray-300 text-xs ${rowColor}`}
              >
                <div className="w-44 p-2 border-r border-gray-300">
                  <span className={`font-semibold ${nameColor}`}>
                    {user.name || "NO NAME FOUND"}
                  </span>
                </div>
                <div className="w-56 p-2 border-r border-gray-300">
                  <span className="text-blue-700 underline">{user.email}</span>
                </div>
                <div className="w-36 p-2 text-gray-600 text-xs">
                  {(() => {
                    try {
                      return new Date(user.createdAt).toLocaleDateString();
                    } catch {
                      return "Invalid Date";
                    }
                  })()}
                </div>
              </article>
            );
          })}

          {filteredData.length === 0 && (
            <section className="p-6 text-center border-t-4 border-red-500 text-base">
              <div className="font-bold mb-2 text-black">
                <span>
                  <i className="bi-emoji-frown-fill me-1" /> no users found for
                  "{search}"
                </span>
              </div>
              {search && (
                <button
                  onClick={() => {
                    setSearch("");
                    doFilter("");
                  }}
                  className="px-4 py-2 mt-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
                >
                  clear search to see all users
                </button>
              )}
            </section>
          )}
        </section>
      </section>
    </main>
  );
}
