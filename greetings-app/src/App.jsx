import { useState } from "react";
import Home from "./pages/Home";

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("greetingsUser");

    if (savedUser) {
      try {
        return {
          photo: "",
          ...JSON.parse(savedUser)
        };
      } catch {
        localStorage.removeItem("greetingsUser");
      }
    }

    return {
      id: "",
      name: "",
      email: "",
      photo: ""
    };
  });

  return <Home user={user} setUser={setUser} />;
}

export default App;
