function ErrorBanner({ message }) {
  if (!message) return null;

  return (
    <div className="rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">
      {message}
    </div>
  );
}

export default ErrorBanner;
