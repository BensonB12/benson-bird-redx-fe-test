export const Spinner = () => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="w-16 h-16 border-4 border-blue-200 border-t-transparent rounded-full animate-spin"
        role="status"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
