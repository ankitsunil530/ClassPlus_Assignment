import { useEffect, useState } from "react";
import apiClient from "../api/client";
import exampleTemplates from "../data/exampleTemplates";

export function useTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await apiClient.get("/templates");
        setTemplates(response.data);
      } catch (apiError) {
        setTemplates(exampleTemplates);
        setError("Backend is not available, so example templates are being shown.");
        console.error("Template loading failed:", apiError.message);
      } finally {
        setLoading(false);
      }
    };

    loadTemplates();
  }, []);

  return { templates, loading, error };
}
