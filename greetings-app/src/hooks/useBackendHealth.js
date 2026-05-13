import { useEffect, useState } from "react";
import apiClient from "../api/client";

export function useBackendHealth() {
  const [health, setHealth] = useState({
    loading: true,
    online: false,
    message: "Checking server..."
  });

  useEffect(() => {
    const checkBackend = async () => {
      try {
        const response = await apiClient.get("/health");
        setHealth({
          loading: false,
          online: true,
          message: `Server is online. Database is ${response.data.database}.`
        });
      } catch (error) {
        setHealth({
          loading: false,
          online: false,
          message: "Server is offline. Save features need the backend."
        });
        console.error("Backend health check failed:", error.message);
      }
    };

    checkBackend();
  }, []);

  return health;
}
