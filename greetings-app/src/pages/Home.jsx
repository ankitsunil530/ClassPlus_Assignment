import { useMemo, useState } from "react";
import apiClient from "../api/client";
import AuthPanel from "../components/AuthPanel";
import CategoryFilter from "../components/CategoryFilter";
import ConnectionStatus from "../components/ConnectionStatus";
import ErrorBanner from "../components/ErrorBanner";
import Header from "../components/Header";
import LoadingState from "../components/LoadingState";
import SavedGreetings from "../components/SavedGreetings";
import SubscriptionModal from "../components/SubscriptionModal";
import TemplateGrid from "../components/TemplateGrid";
import UserForm from "../components/UserForm";
import { useBackendHealth } from "../hooks/useBackendHealth";
import { useTemplates } from "../hooks/useTemplates";

function Home({ user, setUser }) {
  const { templates, loading, error } = useTemplates();
  const health = useBackendHealth();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [savedGreetings, setSavedGreetings] = useState([]);
  const [savedGreetingsLoading, setSavedGreetingsLoading] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  const categories = useMemo(() => {
    const uniqueCategories = templates.map((template) => template.category);
    return ["All", ...new Set(uniqueCategories)];
  }, [templates]);

  const filteredTemplates = useMemo(() => {
    if (selectedCategory === "All") return templates;
    return templates.filter((template) => template.category === selectedCategory);
  }, [selectedCategory, templates]);

  const loadSavedGreetings = async (userId) => {
    if (!userId) return;

    try {
      setSavedGreetingsLoading(true);
      const response = await apiClient.get(`/greetings?userId=${userId}`);
      setSavedGreetings(response.data);
    } catch (apiError) {
      setActionMessage("Saved greetings could not be loaded from backend.");
      console.error("Saved greetings loading failed:", apiError.message);
    } finally {
      setSavedGreetingsLoading(false);
    }
  };

  const handleSaveGreeting = async (template) => {
    try {
      if (!user.name.trim()) {
        setActionMessage("Login or enter your name before saving a greeting.");
        return;
      }

      let activeUserId = user.id;

      if (!activeUserId) {
        const userResponse = await apiClient.post("/users", {
          name: user.name,
          photo: user.photo
        });
        activeUserId = userResponse.data.id;
        setUser((currentUser) => ({
          ...currentUser,
          id: activeUserId
        }));
      }

      await apiClient.post("/greetings", {
        userId: activeUserId,
        userName: user.name,
        templateId: template.id,
        templateImage: template.image,
        category: template.category
      });

      setActionMessage("Greeting saved through backend API.");
      await loadSavedGreetings(activeUserId);
    } catch (apiError) {
      setActionMessage("Greeting could not be saved. Please check the backend server.");
      console.error("Greeting save failed:", apiError.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f7fb]">
      <Header />

      <main className="mx-auto grid max-w-7xl gap-6 px-4 py-6 sm:px-6 lg:grid-cols-[360px_1fr] lg:px-8">
        <aside className="lg:sticky lg:top-6 lg:self-start">
          <ConnectionStatus health={health} />
          <div className="mt-5">
            <AuthPanel user={user} setUser={setUser} onUserSaved={loadSavedGreetings} />
          </div>
          <div className="mt-5">
            <UserForm user={user} setUser={setUser} onUserSaved={loadSavedGreetings} />
          </div>
          <SavedGreetings greetings={savedGreetings} loading={savedGreetingsLoading} />
        </aside>

        <section className="space-y-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-xl font-black text-slate-950">Choose a greeting template</h2>
                <p className="mt-1 text-sm text-slate-600">
                  Filter by occasion, preview your overlay, then download or share the final image.
                </p>
              </div>
              <p className="text-sm font-bold text-slate-500">{filteredTemplates.length} templates</p>
            </div>
            <div className="mt-5">
              <CategoryFilter
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
          </div>

          <ErrorBanner message={error} />
          <ErrorBanner message={actionMessage} />

          {loading ? (
            <LoadingState />
          ) : (
            <TemplateGrid
              templates={filteredTemplates}
              user={user}
              onPremiumClick={() => setShowSubscriptionModal(true)}
              onSaveGreeting={handleSaveGreeting}
            />
          )}
        </section>
      </main>

      <SubscriptionModal open={showSubscriptionModal} onClose={() => setShowSubscriptionModal(false)} />
    </div>
  );
}

export default Home;
