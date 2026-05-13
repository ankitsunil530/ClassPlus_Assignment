function ConnectionStatus({ health }) {
  const statusClass = health.online
    ? "border-teal-200 bg-teal-50 text-teal-800"
    : "border-amber-200 bg-amber-50 text-amber-800";

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm font-semibold ${statusClass}`}>
      {health.loading ? "Checking server..." : health.message}
    </div>
  );
}

export default ConnectionStatus;
