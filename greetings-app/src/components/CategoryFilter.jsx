function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2">
      {categories.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onSelectCategory(category)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
              isSelected
                ? "bg-slate-950 text-white shadow-sm"
                : "border border-slate-200 bg-white text-slate-700 hover:border-teal-300 hover:text-teal-700"
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default CategoryFilter;
