import TemplateCard from "./TemplateCard";

function TemplateGrid({ templates, user, onPremiumClick, onSaveGreeting }) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {templates.map((template) => (
        <TemplateCard
          key={template.id}
          template={template}
          user={user}
          onPremiumClick={onPremiumClick}
          onSaveGreeting={onSaveGreeting}
        />
      ))}
    </div>
  );
}

export default TemplateGrid;
