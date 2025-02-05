import { validationResult } from 'express-validator';
import User from '../models/User.js';

export const registerUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ message: errors.array()[0].msg });
  }

  try {
    const { fullName, dob, gender, phone, email, address, batch, paymentInfo } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "You have already registered this month." });
    }

    const calculatedAge = new Date().getFullYear() - new Date(dob).getFullYear();
    if (calculatedAge < 18 || calculatedAge > 65) {
      return res.status(400).json({ message: "Age must be between 18 and 65." });
    }

    const user = new User({
      fullName,
      dob,
      age: calculatedAge,
      gender,
      phone,
      email,
      address,
      batch,
      monthOfEnrollment: new Date().toISOString(),
      paymentInfo: {
        ...paymentInfo,
        isPaid: paymentInfo.isPaid || false,
        paymentDate: paymentInfo.isPaid ? new Date().toISOString() : null,
        paymentExpires: paymentInfo.isPaid ? new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString() : null,
      },
    });

    await user.save();
    res.status(201).json({ message: paymentInfo.isPaid ? "Registration and payment successful!" : "Registration successful! Please complete payment later." });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updatePayment = async (req, res) => {
  const { email, batch } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    if(user.paymentInfo.isPaid){
      return res.status(400).json({ message: "Payment already made!" });
    }
    
    if (user.batch !== batch) {
      user.batch = batch;
    }
    
    user.paymentInfo.isPaid = true;
    user.paymentInfo.paymentDate = new Date().toISOString();
    user.paymentInfo.paymentExpires = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).toISOString();
    const todaysdate = new Date();
    if (todaysdate === user.paymentInfo.paymentExpires) {
      user.paymentInfo.isPaid = false;
      user.paymentInfo.paymentDate = null;
      user.paymentInfo.paymentExpires = null;
    }
    

    await user.save();

    return res.status(200).json({ success: true, message: "Payment successful!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};


export const checkUser = async (req, res) => {
  const { email } = req.params;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Instead of returning an error for already paid users, return the payment status
    return res.status(200).json({ exists: true, isPaid: user.paymentInfo.isPaid, batch: user.batch });

  } catch (error) {
    console.error("Error in checkUser:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};