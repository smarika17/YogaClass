import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function calculateAge(dob) {
  const dobDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }
  return age;
}

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    batch: '',
    paymentMethod: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    upiId: '',
    isPaid: false,
    paymentDate: null,
    paymentExpires: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    const age = calculateAge(formData.dob);
    if (!formData.fullName) newErrors.fullName = 'Full name is required.';
    if (!formData.dob) newErrors.dob = 'Date of birth is required.';
    if (age < 18 || age > 65) newErrors.dob = 'Age must be between 18 and 65.';
    if (!formData.gender) newErrors.gender = 'Gender is required.';
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required.';
    }
    else if (formData.phone.length !== 10 || !/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
    }
    if (!formData.email) newErrors.email = 'Email is required.';
    if (!formData.street) newErrors.street = 'Street address is required.';
    if (!formData.city) newErrors.city = 'City is required.';
    if (!formData.state) newErrors.state = 'State is required.';
    if (!formData.postalCode) newErrors.postalCode = 'Postal code is required.';
    if (!formData.country) newErrors.country = 'Country is required.';
    if (!formData.batch) newErrors.batch = 'Batch selection is required.';
    if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required.';

    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required.';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required.';
      if (!formData.cvv) newErrors.cvv = 'CVV is required.';
    }
    if (formData.paymentMethod === 'upi' && !formData.upiId) {
      newErrors.upiId = 'UPI ID is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/api/users/register`, {
        ...formData,
        dob: new Date(formData.dob).toISOString(),
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postalCode: formData.postalCode,
          country: formData.country
        },
        paymentInfo: {
          method: formData.paymentMethod,
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvv: formData.cvv,
          upiId: formData.upiId,
          isPaid: formData.isPaid,
          paymentDate: formData.isPaid ? new Date().toISOString() : null
        }
      });

      toast.success(response.data.message);
      navigate('/');
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed.");
    }
  };

  const handlePayment = () => {
    setFormData({ ...formData, isPaid: true });
    toast.success("Payment successful!");
  };

  const handlePaymentLater = () => {
    setFormData({ ...formData, isPaid: false });
    toast.info("Payment pending.");
  }

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.heading}>Yoga Class Registration</h2>

        <input type="text" name="fullName" placeholder="Full Name" onChange={handleChange} value={formData.fullName} style={styles.input} />
        {errors.fullName && <span style={styles.error}>{errors.fullName}</span>}

        <input type="date" name="dob" onChange={handleChange} value={formData.dob} style={styles.input} />
        {errors.dob && <span style={styles.error}>{errors.dob}</span>}

        <select name="gender" onChange={handleChange} value={formData.gender} style={styles.input}>
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        {errors.gender && <span style={styles.error}>{errors.gender}</span>}

        <input type="text" name="phone" placeholder="Phone" onChange={handleChange} value={formData.phone} style={styles.input} />
        {errors.phone && <span style={styles.error}>{errors.phone}</span>}

        <input type="email" name="email" placeholder="Email" onChange={handleChange} value={formData.email} style={styles.input} />
        {errors.email && <span style={styles.error}>{errors.email}</span>}

        <input type="text" name="street" placeholder="Street Address" onChange={handleChange} value={formData.street} style={styles.input} />
        {errors.street && <span style={styles.error}>{errors.street}</span>}

        <input type="text" name="city" placeholder="City" onChange={handleChange} value={formData.city} style={styles.input} />
        {errors.city && <span style={styles.error}>{errors.city}</span>}

        <input type="text" name="state" placeholder="State" onChange={handleChange} value={formData.state} style={styles.input} />
        {errors.state && <span style={styles.error}>{errors.state}</span>}

        <input type="text" name="postalCode" placeholder="Postal Code" onChange={handleChange} value={formData.postalCode} style={styles.input} />
        {errors.postalCode && <span style={styles.error}>{errors.postalCode}</span>}

        <input type="text" name="country" placeholder="Country" onChange={handleChange} value={formData.country} style={styles.input} />
        {errors.country && <span style={styles.error}>{errors.country}</span>}

        <select name="batch" onChange={handleChange} value={formData.batch} style={styles.input}>
          <option value="">Select Batch</option>
          <option value="6-7AM">6-7AM</option>
          <option value="7-8AM">7-8AM</option>
          <option value="8-9AM">8-9AM</option>
          <option value="5-6PM">5-6PM</option>
        </select>
        {errors.batch && <span style={styles.error}>{errors.batch}</span>}

        <select name="paymentMethod" onChange={handleChange} value={formData.paymentMethod} style={styles.input}>
          <option value="">Select Payment Method</option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
        </select>
        {errors.paymentMethod && <span style={styles.error}>{errors.paymentMethod}</span>}

        {formData.paymentMethod === "card" && (
          <>
            <input type="text" name="cardNumber" placeholder="Card Number" onChange={handleChange} value={formData.cardNumber} style={styles.input} />
            {errors.cardNumber && <span style={styles.error}>{errors.cardNumber}</span>}
            <input type="text" name="expiryDate" placeholder="Expiry Date (MM/YY)" onChange={handleChange} value={formData.expiryDate} style={styles.input} />
            {errors.expiryDate && <span style={styles.error}>{errors.expiryDate}</span>}
            <input type="text" name="cvv" placeholder="CVV" onChange={handleChange} value={formData.cvv} style={styles.input} />
            {errors.cvv && <span style={styles.error}>{errors.cvv}</span>}
          </>
        )}

        {formData.paymentMethod === "upi" && (
          <input type="text" name="upiId" placeholder="UPI ID" onChange={handleChange} value={formData.upiId} style={styles.input} />
        )}
        {errors.upiId && <span style={styles.error}>{errors.upiId}</span>}

        {(!formData.isPaid && (formData.upiId || (formData.cardNumber && formData.cvv && formData.expiryDate))) && (
          <div style={{ display: "flex", justifyContent: "center" , flexDirection:"column", alignItems:"center"}}>
            <p style={{color:"grey"}}>Pay Rs. 500 to complete the Registration</p>
            <div style={styles.payment}>
            <button type="button" onClick={handlePayment} style={styles.payButton}>Pay Now</button>
            <button type="button" onClick={handlePaymentLater} style={styles.payButton}>Pay Later</button>
            </div>
          </div>
        )}

        {errors.paymentStatus && <span style={styles.error}>{errors.paymentStatus}</span>}

        <button type="submit"    style={styles.button}>Submit Registration</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    display: 'flex',
    justifyContent: 'center',
    minHeight: '100vh',
    boxSizing: 'border-box',
  },
  form: {
    backgroundColor: '#121110',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box'
  },
  heading: {
    textAlign: 'center',
    color: '#fff',
    marginBottom: '20px'
  },
  input: {
    margin: '10px 5px',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    padding: '10px',
    borderRadius: '5px',
    fontSize: '16px',
    margin: '10px'
  },
  payButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
    padding: '10px 20px',
    borderRadius: '5px',
    fontSize: '16px',
    transition: 'background 0.3s',
    width: '200px',
  },
  error: {
    color: 'red',
    fontSize: '12px',
    margin: '5px 0 10px',
  },
  payment: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection:"row",
    gap:"10px"
  }
};

export default Register;
