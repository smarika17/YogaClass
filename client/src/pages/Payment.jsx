import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router';

export default function Payment() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);

  const navigate = useNavigate();

  const handleValidation = async () => {
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    
    setLoading(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/checkuser/${email}`
      );
      if (response.data.exists) {
        if (response.data.isPaid) {
          toast.info("Payment already completed!");
          navigate("/");
        } else {
          setVerified(true);
          toast.success("User verified! Proceed with payment.");
        }
      } else {
        toast.error("User not found! Please register first.");
      }
    } catch (error) {
      console.error("Error checking user:", error);
      toast.error("Error checking user!");
    }
    setLoading(false);
  };

  const handlePayment = async () => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/updatePayment/${email}`
      );
      if (response.data.success) {
        navigate("/");
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      toast.error("Error processing payment!");
    }
  };

  const validate = () => {
    let newErrors = {};
    if (email.trim() === "") newErrors.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Email is invalid.";
    return newErrors;
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
      <h1>Payment</h1>
      {!verified ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            style={{ width: "90%", maxWidth: "400px", margin: '10px 5px', padding: '10px', fontSize: '16px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          {errors.email && <span style={{ color: "red" }}>{errors.email}</span>}
          <button
            onClick={handleValidation}
            disabled={loading}
            style={{ padding: "10px 20px", fontSize: "1rem", backgroundColor: "blue", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", outline: "none", marginTop: "10px" }}
          >
            {loading ? "Checking..." : "Continue"}
          </button>
        </div>
      ) : (
        <div>
          <p style={{ color: "grey" }}>Pay Rs. 500 to complete the Registration</p>
          <button
            onClick={handlePayment}
            style={{ padding: "10px 20px", fontSize: "1rem", backgroundColor: "green", color: "white", border: "none", borderRadius: "5px", cursor: "pointer", outline: "none", marginTop: "10px" }}
          >
            Pay
          </button>
        </div>
      )}
    </div>
  );
}
