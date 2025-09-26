import React, { useState } from "react";
import { useParams } from "react-router-dom";
import spaces from "../data/spaces.json";
import { useAuth } from "../contexts/AuthContext";
import { useBookings } from "../contexts/BookingContext";

export default function SpaceDetail() {
  const { spaceId } = useParams();
  const space = spaces.find((s) => s.id === parseInt(spaceId));
  const { user } = useAuth();
  const { addBooking, bookings } = useBookings();
  const [slot, setSlot] = useState("");
  const [date, setDate] = useState("");
  const [message, setMessage] = useState(user ? "Please select date and time." : "");

  // ✅ Today’s date in yyyy-mm-dd format for min attr
  const today = new Date().toISOString().split("T")[0];

const handleBooking = () => {
  if (!user) {
    window.alert("You must be logged in to book.");
    return;
  }
  if (!date || !slot) {
    setMessage("Please select both a date and a time slot.");
    return;
  }

  // 🚫 Prevent booking past dates (double protection)
  const todayDate = new Date().toISOString().split("T")[0];
  if (date < todayDate) {
    setMessage("You cannot book a past date.");
    return;
  }

  // 🔎 Check if already booked
  const alreadyBooked = bookings.some(
    (b) => b.spaceId === space.id && b.slot === slot && b.date === date
  );

  if (alreadyBooked) {
    setMessage("This place is already booked at that time on that date.");
    return;
  }

  addBooking({
    id: Date.now(),
    spaceId: space.id,
    spaceName: space.name,
    slot,
    date,
  });

  setMessage("Booking confirmed!");
};


  if (!space) return <div className="container mt-4">Space not found.</div>;

  return (
    <div className="container mt-4">
      <div className="page-Card">
        <h2>{space.name}</h2>
        <p className="text-muted">{space.location}</p>

        {/* Image Gallery */}
        <div className="row mb-4">
          {[space.main_image, ...space.images].map((img, i) => (
            <div className="col-md-3 col-sm-4 col-6 mb-3" key={i}>
              <img
                src={img}
                alt={`${space.name} ${i + 1}`}
                className="img-fluid rounded shadow-sm gallery-thumb"
                data-bs-toggle="modal"
                data-bs-target={`#imageModal-${i}`}
              />
              <div
                className="modal fade"
                id={`imageModal-${i}`}
                tabIndex="-1"
                aria-hidden="true"
              >
                <div className="modal-dialog modal-dialog-centered modal-lg">
                  <div className="modal-content bg-transparent border-0">
                    <button
                      type="button"
                      className="btn-close ms-auto me-2 mt-2"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                    <img
                      src={img}
                      alt={`${space.name} full ${i + 1}`}
                      className="img-fluid rounded shadow"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="row">
          {/* Left column: description + amenities */}
          <div className="col-md-8">
            <p>{space.description}</p>
            <h5>Amenities:</h5>
            <ul>
              {space.amenities.map((a, i) => (
                <li key={i}>{a}</li>
              ))}
            </ul>
          </div>

          {/* Right column: booking card */}
          <div className="col-md-4">
            <div className="card shadow-sm p-3">
              <h5 className="card-title">Book a Slot</h5>

              {/* Date Picker */}
              <input
                type="date"
                className="form-control mb-3"
                value={date}
                min={today} // 🚫 prevent past dates
                onChange={(e) => setDate(e.target.value)}
              />

              {/* Time Slot Selector */}
              <select
                className="form-select form-select-sm mb-3"
                value={slot}
                onChange={(e) => setSlot(e.target.value)}
              >
                <option value="">-- Choose a time slot --</option>
                {space.time_slots.map((t, i) => (
                  <option key={i} value={t}>
                    {t}
                  </option>
                ))}
              </select>

              <button className="btn btn-success w-100" onClick={handleBooking}>
                Book Now
              </button>

              {message && user && (
                <div className="alert alert-info mt-3">{message}</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}