import React from "react";

export default function SearchBar({ search, setSearch }) {
  return (
    <input
      type="text"
      className="form-control mb-4"
      placeholder="Search by name or location..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}