import { useState } from "react";
import apiClient from "../api/client";

function UserForm({ user, setUser, onUserSaved }) {
  const [saveStatus, setSaveStatus] = useState("");

  const handleNameChange = (event) => {
    setUser((currentUser) => ({
      ...currentUser,
      name: event.target.value
    }));
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const photoUrl = URL.createObjectURL(file);
    setUser((currentUser) => ({
      ...currentUser,
      photo: photoUrl
    }));
  };

  const handleSaveUser = async () => {
    try {
      setSaveStatus("Saving...");
      const response = await apiClient.post("/users", {
        name: user.name,
        photo: user.photo
      });
      setUser((currentUser) => ({
        ...currentUser,
        id: response.data.id
      }));
      onUserSaved(response.data.id);
      setSaveStatus("Saved successfully");
    } catch (error) {
      setSaveStatus("Could not save right now");
      console.error("User save failed:", error.message);
    }
  };

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Personalize</h2>
          <p className="mt-1 text-sm text-slate-600">Your details appear instantly on every greeting.</p>
        </div>
        <div className="h-14 w-14 overflow-hidden rounded-full border-2 border-white bg-slate-100 shadow">
          {user.photo ? (
            <img src={user.photo} alt="Profile preview" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-lg font-bold text-slate-400">
              {user.name ? user.name.charAt(0).toUpperCase() : "U"}
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Your name</span>
          <input
            type="text"
            value={user.name}
            onChange={handleNameChange}
            placeholder="Enter your name"
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Profile photo</span>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="mt-2 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 file:mr-3 file:rounded-md file:border-0 file:bg-slate-900 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-white hover:file:bg-slate-700"
          />
        </label>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
        <button
          type="button"
          onClick={handleSaveUser}
          disabled={!user.name.trim()}
          className="rounded-md bg-teal-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          Save User Info
        </button>
        {saveStatus && <p className="text-sm font-medium text-slate-600">{saveStatus}</p>}
      </div>

      {user.id && (
        <div className="mt-4 rounded-md bg-teal-50 px-3 py-2 text-xs font-semibold text-teal-800">
          Saved user id: {user.id}
        </div>
      )}
    </section>
  );
}

export default UserForm;
