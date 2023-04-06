import express from 'express';
const router = express.Router()
import basicRoutes from './basic.routes.js';

router.use("/basic", basicRoutes);

export default router;