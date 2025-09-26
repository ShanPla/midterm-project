import React, { useState, useEffect } from "react";
import spaces from "../data/spaces.json";
import SearchBar from "../components/SearchBar";
import SpaceCard from "../components/SpaceCard";

export default function Home() {
  const [search, setSearch] = useState("");
  const [authMessage, setAuthMessage] = useState("");

  useEffect(() => {
    const message = sessionStorage.getItem("authMessage");
    if (message) {
      setAuthMessage(message);
      sessionStorage.removeItem("authMessage"); // clear after showing once
    }
  }, []);

  const filteredSpaces = spaces.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4">
      {/* 👇 Added slide-up animation */}
      <div className="page-Card slide-up">
        <h2 className="mb-3">Available Study Spaces</h2>

        {/* 🔔 Show auth warning */}
        {authMessage && (
          <div className="alert alert-danger text-center">{authMessage}</div>
        )}

        <SearchBar search={search} setSearch={setSearch} />

        <div className="row">
          {filteredSpaces.length > 0 ? (
            filteredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))
          ) : search.trim() !== "" ? (
            <div className="col-12">
              <div className="alert alert-warning text-center">
                No study space found matching "<strong>{search}</strong>"
              </div>
            </div>
          ) : (
            <div className="col-12">
              <div className="alert alert-info text-center">
                Start typing to search for a study space.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
