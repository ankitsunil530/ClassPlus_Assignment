function LoadingState() {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[1, 2, 3].map((item) => (
        <div key={item} className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
          <div className="aspect-[4/5] animate-pulse rounded-md bg-slate-200" />
          <div className="mt-3 h-9 animate-pulse rounded-md bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

export default LoadingState;
