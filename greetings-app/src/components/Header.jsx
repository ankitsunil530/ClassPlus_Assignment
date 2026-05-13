function Header() {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-600">Make a greeting in a minute</p>
          <h1 className="mt-1 text-2xl font-bold text-slate-950 sm:text-3xl">Custom Greetings & Wishes App</h1>
        </div>
        <div className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-sm font-medium text-slate-600">
          Personalize, save, download
        </div>
      </div>
    </header>
  );
}

export default Header;
