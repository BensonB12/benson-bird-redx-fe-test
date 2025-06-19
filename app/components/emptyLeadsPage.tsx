export const EmptyLeadsPage = () => {
  return (
    <main className="p-5 bg-white min-h-screen">
      <section className="text-center p-6 bg-red-600 text-white inset-shadow-sm inset-shadow-red-900/50 rounded">
        <h2 className="text-xl font-semibold">
          <i className="bi-emoji-frown-fill me-1" /> NO LEADS EXIST
        </h2>
      </section>
    </main>
  );
};
