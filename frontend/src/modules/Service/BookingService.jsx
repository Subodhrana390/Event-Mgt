import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import apiClient from "../../api/apiClient";

const BookingService = () => {
  const { serviceId } = useParams(); // Get the service ID from the URL
  const navigate = useNavigate(); // For navigation
  const [service, setService] = useState(null);
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch service details
  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await apiClient.get(`/api/services/${serviceId}`);
        setService(response.data);
      } catch (err) {
        setError("Failed to fetch service details");
      }
    };

    fetchService();
  }, [serviceId]);

  // Handle date change
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  // Handle booking submission
  const handleBooking = async () => {
    if (!date) {
      setError("Please select a date");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Step 1: Create a booking
      const bookingResponse = await axios.post("/api/bookings", {
        user: "64f1b2b3c9e77b001f8e4d1a", // Replace with the logged-in user's ID
        service: serviceId,
        date,
        amount: service.price, // Assuming the service has a price field
      });

      const { razorpayOrderId, booking } = bookingResponse.data;

      // Step 2: Redirect to the confirmation page
      navigate(`/confirm-payment/${booking._id}`, {
        state: { razorpayOrderId, amount: service.price },
      });
    } catch (err) {
      setError("Booking failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!service) {
    return <div>Loading...</div>;
  }

  return (
    <div className="service-booking-page">
      <h1>Book {service.title}</h1>
      <p>{service.description}</p>
      <p>Price: ₹{service.price}</p>

      <div className="form-group">
        <label htmlFor="date">Select Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleDateChange}
          min={new Date().toISOString().split("T")[0]} // Disable past dates
        />
      </div>

      {error && <p className="error">{error}</p>}

      <button onClick={handleBooking} disabled={loading}>
        {loading ? "Processing..." : "Book Now"}
      </button>
    </div>
  );
};

export default BookingService;