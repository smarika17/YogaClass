import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import userRoutes from './routes/userRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import middleware from './middleware/middleware.js';

dotenv.config();

const app = express();
app.use(cors({ origin: '*' }));
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);

app.use(middleware);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));