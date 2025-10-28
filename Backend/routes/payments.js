import express from 'express';
import { createPayUOrder, handlePayUResponse, getPaymentHistory } from '../controllers/paymentController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// All payment routes require authentication
router.use(authMiddleware);

// Create PayU order
router.post('/create-order', createPayUOrder);

// Handle PayU payment response (can be called without auth for webhook)
router.post('/response', handlePayUResponse);

// Get payment history
router.get('/history', getPaymentHistory);

export default router; 