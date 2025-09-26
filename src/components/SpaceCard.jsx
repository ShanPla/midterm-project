import React from "react";
import { Link } from "react-router-dom";

export default function SpaceCard({ space }) {
  return (
    <div className="col-md-4 mb-4">
      <div className="card h-100 shadow-sm">
        <img src={space.main_image} className="card-img-top" alt={space.name} />
        <div className="card-body">
          <h5 className="card-title">{space.name}</h5>
          <p className="card-text">{space.location}</p>
          <p className="fw-bold">₱{space.price}</p>
          <Link to={`/space/${space.id}`} className="btn btn-primary w-100">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}