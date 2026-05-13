function SubscriptionModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-amber-600">Premium template</p>
            <h2 className="mt-1 text-2xl font-black text-slate-950">Subscribe to unlock</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-slate-200 px-3 py-1 text-sm font-bold text-slate-600 transition hover:bg-slate-100"
            aria-label="Close subscription popup"
          >
            X
          </button>
        </div>
        <p className="mt-4 text-slate-600">
          This template is marked as premium. A subscription screen can be connected here later.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-md bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default SubscriptionModal;
