import express from 'express';
import { getAllUsers } from '../controllers/adminController.js';

const router = express.Router();

router.get('/users', getAllUsers);

export default router;