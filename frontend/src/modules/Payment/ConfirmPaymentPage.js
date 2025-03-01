import React, { useEffect } from "react";
import axios from "axios";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import Razorpay from "@razorpay/razorpay-js";

const ConfirmPaymentPage = () => {
  const { bookingId } = useParams(); // Get the booking ID from the URL
  const location = useLocation(); // Access state passed from the previous page
  const navigate = useNavigate(); // For navigation
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { razorpayOrderId, amount } = location.state;

  // Handle payment confirmation
  useEffect(() => {
    const handlePayment = async () => {
      setLoading(true);
      setError("");

      try {
        // Initialize Razorpay
        const razorpay = new Razorpay({
          key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Your Razorpay Key ID
        });

        const options = {
          order_id: razorpayOrderId,
          amount: amount * 100, // Amount in paise
          currency: "INR",
          name: "Service Booking",
          description: `Payment for booking ID: ${bookingId}`,
          handler: async (response) => {
            try {
              // Confirm payment with the backend
              await axios.post("/api/bookings/confirm-payment", {
                razorpayOrderId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });

              alert("Payment successful! Your booking is confirmed.");
              navigate("/"); // Redirect to the home page or booking details page
            } catch (err) {
              setError("Payment confirmation failed");
            }
          },
          prefill: {
            name: "John Doe", // Replace with user's name
            email: "john.doe@example.com", // Replace with user's email
            contact: "9876543210", // Replace with user's phone number
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new Razorpay(options);
        rzp.open();
      } catch (err) {
        setError("Payment initialization failed: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    handlePayment();
  }, [bookingId, razorpayOrderId, amount, navigate]);

  return (
    <div className="confirm-payment-page">
      <h1>Confirm Payment</h1>
      {loading && <p>Processing payment...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default ConfirmPaymentPage;