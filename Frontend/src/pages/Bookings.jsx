import React from "react";
import BookingForm from "../components/Booking";

const Bookings = () => {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-center text-3xl font-bold mb-6">Book Your Service</h1>
      <BookingForm />
    </div>
  );
};

export default Bookings;