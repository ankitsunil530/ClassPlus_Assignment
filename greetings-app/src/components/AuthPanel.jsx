import { useState } from "react";
import apiClient from "../api/client";

function AuthPanel({ user, setUser, onUserSaved }) {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({
      ...currentForm,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setMessage(mode === "login" ? "Logging in..." : "Creating account...");
      const endpoint = mode === "login" ? "/users/login" : "/users/register";
      const payload = mode === "login"
        ? { email: form.email, password: form.password }
        : form;

      const response = await apiClient.post(endpoint, payload);

      setUser((currentUser) => ({
        ...currentUser,
        id: response.data.id,
        name: response.data.name,
        email: response.data.email || ""
      }));
      localStorage.setItem("greetingsUser", JSON.stringify(response.data));

      onUserSaved(response.data.id);
      setMessage("You are logged in.");
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handleLogout = () => {
    setUser({
      id: "",
      name: "",
      email: "",
      photo: ""
    });
    localStorage.removeItem("greetingsUser");
    setMessage("");
  };

  if (user.id) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-slate-500">Logged in as</p>
        <h2 className="mt-1 break-words text-lg font-bold text-slate-950">{user.name}</h2>
        {user.email && <p className="mt-1 break-words text-sm text-slate-600">{user.email}</p>}
        <button
          type="button"
          onClick={handleLogout}
          className="mt-4 w-full rounded-md border border-slate-300 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-rose-300 hover:text-rose-700"
        >
          Logout
        </button>
      </section>
    );
  }

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex rounded-md bg-slate-100 p-1">
        <button
          type="button"
          onClick={() => setMode("login")}
          className={`flex-1 rounded px-3 py-2 text-sm font-bold ${mode === "login" ? "bg-white text-slate-950 shadow-sm" : "text-slate-600"}`}
        >
          Login
        </button>
        <button
          type="button"
          onClick={() => setMode("register")}
          className={`flex-1 rounded px-3 py-2 text-sm font-bold ${mode === "register" ? "bg-white text-slate-950 shadow-sm" : "text-slate-600"}`}
        >
          Register
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        {mode === "register" && (
          <label className="block">
            <span className="text-sm font-semibold text-slate-700">Name</span>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
              placeholder="Your name"
            />
          </label>
        )}

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            placeholder="you@example.com"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            placeholder="Minimum 6 characters"
          />
        </label>

        <button
          type="submit"
          className="w-full rounded-md bg-slate-950 px-4 py-2 text-sm font-bold text-white transition hover:bg-slate-700"
        >
          {mode === "login" ? "Login" : "Create Account"}
        </button>
      </form>

      {message && <p className="mt-3 text-sm font-medium text-slate-600">{message}</p>}
    </section>
  );
}

export default AuthPanel;
