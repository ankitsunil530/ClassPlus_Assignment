function SavedGreetings({ greetings, loading }) {
  return (
    <section className="mt-5 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Saved Greetings</h2>
          <p className="mt-1 text-sm text-slate-600">Your saved cards will show here.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {greetings.length}
        </span>
      </div>

      <div className="mt-4 space-y-3">
        {loading && <p className="text-sm font-medium text-slate-500">Loading saved greetings...</p>}

        {!loading && greetings.length === 0 && (
          <p className="text-sm font-medium text-slate-500">No greetings saved yet.</p>
        )}

        {!loading && greetings.map((greeting) => (
          <div key={greeting.id} className="flex items-center gap-3 rounded-md border border-slate-200 p-3">
            <img
              src={greeting.templateImage}
              alt={greeting.category}
              className="h-14 w-12 rounded object-cover"
            />
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-slate-900">{greeting.category}</p>
              <p className="truncate text-xs font-medium text-slate-500">
                Saved for {greeting.userName}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SavedGreetings;
