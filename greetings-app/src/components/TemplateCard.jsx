import { useState } from "react";
import { useGreetingExport } from "../hooks/useGreetingExport";

function TemplateCard({ template, user, onPremiumClick, onSaveGreeting }) {
  const [workingAction, setWorkingAction] = useState("");
  const [message, setMessage] = useState("");
  const { downloadGreeting, shareGreeting } = useGreetingExport();
  const displayName = user.name.trim() || "Your Name";
  const fileName = `${displayName.toLowerCase().replaceAll(" ", "-")}-greeting.png`;

  const handleDownload = async () => {
    try {
      setWorkingAction("download");
      setMessage("");
      await downloadGreeting(template, user, fileName);
      setMessage("Download started.");
    } catch (error) {
      setMessage("Download failed. Please try again.");
      console.error("Download failed:", error.message);
    } finally {
      setWorkingAction("");
    }
  };

  const handleShare = async () => {
    try {
      setWorkingAction("share");
      setMessage("");
      const shared = await shareGreeting(template, user, fileName);

      if (!shared) {
        await downloadGreeting(template, user, fileName);
        setMessage("Sharing is not supported here, so PNG download started.");
      } else {
        setMessage("Share sheet opened.");
      }
    } catch (error) {
      setMessage("Share failed. PNG download may work instead.");
      console.error("Share failed:", error.message);
    } finally {
      setWorkingAction("");
    }
  };

  const handleCardClick = () => {
    if (template.premium) {
      onPremiumClick();
    }
  };

  const handleSaveGreeting = async () => {
    try {
      setWorkingAction("save");
      setMessage("");
      await onSaveGreeting(template);
      setMessage("Saved.");
    } catch (error) {
      setMessage("Could not save this card.");
      console.error("Save failed:", error.message);
    } finally {
      setWorkingAction("");
    }
  };

  return (
    <article className="group rounded-lg border border-slate-200 bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-xl">
      <button
        type="button"
        onClick={handleCardClick}
        className="block w-full text-left"
        aria-label={`${template.category} greeting template`}
      >
        <div className="relative aspect-[4/5] overflow-hidden rounded-md bg-slate-100">
          <img src={template.image} alt={`${template.category} greeting`} className="h-full w-full object-cover" />

          <div className="absolute left-1/2 top-[18%] -translate-x-1/2">
            <div className="h-20 w-20 overflow-hidden rounded-full border-4 border-white bg-white/85 shadow-lg sm:h-24 sm:w-24">
              {user.photo ? (
                <img src={user.photo} alt={displayName} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-teal-50 text-3xl font-black text-teal-700">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </div>
          </div>

          <div className="absolute inset-x-5 bottom-[14%] rounded-md bg-white/88 px-4 py-3 text-center shadow-lg backdrop-blur-sm">
            <p className="text-xs font-bold uppercase tracking-wide text-teal-700">{template.category}</p>
            <h3 className="mt-1 break-words text-xl font-black text-slate-950">{displayName}</h3>
          </div>

          {template.premium && (
            <span className="absolute right-3 top-3 rounded-full bg-amber-400 px-3 py-1 text-xs font-black text-slate-950 shadow">
              Premium
            </span>
          )}
        </div>
      </button>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={handleDownload}
          className="flex-1 rounded-md bg-slate-950 px-3 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          {workingAction === "download" ? "Preparing..." : "Download"}
        </button>
        <button
          type="button"
          onClick={handleSaveGreeting}
          className="flex-1 rounded-md bg-teal-600 px-3 py-2 text-sm font-bold text-white transition hover:bg-teal-700"
        >
          {workingAction === "save" ? "Saving..." : "Save"}
        </button>
        <button
          type="button"
          onClick={handleShare}
          className="flex-1 rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 transition hover:border-teal-400 hover:text-teal-700"
        >
          {workingAction === "share" ? "Preparing..." : "Share"}
        </button>
      </div>
      {message && <p className="mt-2 text-xs font-semibold text-slate-500">{message}</p>}
    </article>
  );
}

export default TemplateCard;
