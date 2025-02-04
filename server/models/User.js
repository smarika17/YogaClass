import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city:   { type: String, required: true },
  state:  { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true }
});

const paymentInfoSchema = new mongoose.Schema({
  method: { type: String, required: true },
  cardNumber: { type: String },
  expiryDate: { type: String },
  cvv: { type: String },
  upiId: { type: String },
  isPaid: { type: Boolean, default: false },
  paymentDate: { type: Date, default: null },
  paymentExpires: { type: Date, default: null },
});

const userSchema = new mongoose.Schema({
  // id:       { type: String, required: true, unique: true }, // we can use this as a unique identifier when we will write admin panel
  fullName: { type: String, required: true },
  dob:      { type: Date, required: true },
  age:      { type: Number, required: true },
  gender:   { type: String, required: true },
  phone:    { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  address:  addressSchema,
  batch: { 
    type: String, 
    required: true, 
    enum: ["6-7AM", "7-8AM", "8-9AM", "5-6PM"] 
  },
  monthOfEnrollment: { type: String, required: true },
  paymentInfo: paymentInfoSchema,
  lastRegistered: { type: Date, default: null } 
}, {
  timestamps: true,
});

export default mongoose.models.User || mongoose.model('User', userSchema);

