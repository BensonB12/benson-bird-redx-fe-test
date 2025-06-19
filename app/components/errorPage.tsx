import type { FC } from "react";

export const ErrorPage: FC<{ error: string }> = ({ error }) => {
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
            window.location.reload();
          }}
          className="mt-4 px-4 py-2 text-red-100 bg-zinc-600 hover:bg-zinc-700 rounded shadow-md/50 "
        >
          click me to try again
        </button>
      </section>
    </main>
  );
};
