import { Spinner } from "./spinner";

export const LoadingPage = () => {
  return (
    <main className="p-5 bg-white min-h-screen">
      <section className="p-4 bg-primary inset-shadow-sm inset-shadow-blue-900/50 rounded">
        <h2 className="font-serif text-white text-2xl font-bold">
          LOADING LEADS...
        </h2>
        <Spinner />
        <p className="text-xs text-zinc-200">Thank you for being patient</p>
      </section>
    </main>
  );
};
