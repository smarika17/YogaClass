import express from 'express';
import { registerUser, deleteUser, updatePayment, checkUser } from '../controllers/userController.js';
import { body } from 'express-validator';

const router = express.Router();

router.post('/register', [
  body('fullName').notEmpty().withMessage('Full Name is required'),
  body('dob').notEmpty().withMessage('Date of Birth is required')
    .isISO8601().toDate().withMessage('Invalid date format'),
  body('gender').notEmpty().withMessage('Gender is required'),
  body('phone').notEmpty().withMessage('Phone is required')
    .isMobilePhone().withMessage('Invalid phone number'),
  body('email').notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Invalid email'),
  body('address.street').notEmpty().withMessage('Street is required'),
  body('address.city').notEmpty().withMessage('City is required'),
  body('address.state').notEmpty().withMessage('State is required'),
  body('address.postalCode').notEmpty().withMessage('Postal Code is required'),
  body('address.country').notEmpty().withMessage('Country is required'),
  body('batch').notEmpty().withMessage('Batch is required')
    .isIn(["6-7AM", "7-8AM", "8-9AM", "5-6PM"]).withMessage('Invalid batch'),
  body('paymentInfo.method').notEmpty().withMessage('Payment method is required')
], registerUser);

router.delete('/delete/:userId', deleteUser);

router.put('/updatepayment/', updatePayment);

router.get('/checkuser/:email', checkUser);

export default router;