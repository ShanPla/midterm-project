import React, { useState } from "react";
import moment from "moment"; // 📌 import moment
import { useBookings } from "../contexts/BookingContext";

export default function Dashboard() {
  const { bookings, cancelBooking } = useBookings();
  const [toCancel, setToCancel] = useState(null);

  return (
    <div className="container mt-4">
      <div className="page-Card">
        <h2>My Bookings</h2>
        {bookings.length === 0 ? (
          <p>No bookings yet.</p>
        ) : (
          <ul className="list-group">
            {bookings.map((b) => (
              <li
                key={b.id}
                className="list-group-item d-flex justify-content-between align-items-center"
              >
                <span>
                  <strong>{b.spaceName}</strong> <br />
                  Date: {moment(b.date).format("MMMM D, YYYY")} <br />
                  Time: {b.slot}
                </span>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => setToCancel(b.id)}
                >
                  Cancel
                </button>
              </li>
            ))}
          </ul>
        )}

        {toCancel && (
          <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Confirm Cancel</h5>
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setToCancel(null)}
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to cancel this booking?</p>
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setToCancel(null)}
                  >
                    Close
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      cancelBooking(toCancel);
                      setToCancel(null);
                    }}
                  >
                    Yes, Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}