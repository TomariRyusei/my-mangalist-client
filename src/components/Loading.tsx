export function Loading() {
  return (
    <div className="flex justify-center items-center mt-10 gap-3" aria-label="Loading">
      <div className="animate-spin h-5 w-5 border-2 border-slate-800 opacity-50 rounded-full border-t-transparent"></div>
      <p className="text-slate-800">Loading...</p>
    </div>
  );
}
