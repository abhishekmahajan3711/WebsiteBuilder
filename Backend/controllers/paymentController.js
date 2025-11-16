import Payment from '../models/Payment.js';
import UserFeatureAccess from '../models/UserFeatureAccess.js';
import crypto from 'crypto';

// PayU Configuration
const PAYU_MERCHANT_KEY = process.env.PAYU_MERCHANT_KEY;
const PAYU_MERCHANT_SALT = process.env.PAYU_MERCHANT_SALT;
const PAYU_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://securegw.paytm.in' 
  : 'https://test.payu.in';

// Generate PayU hash
const generatePayUHash = (data) => {
  const hashString = `${data.key}|${data.txnid}|${data.amount}|${data.productinfo}|${data.firstname}|${data.email}|||||||||||${data.salt}`;
  return crypto.createHash('sha512').update(hashString).digest('hex');
};

// Create PayU order
export const createPayUOrder = async (req, res) => {
  try {
    const { items, totalAmount } = req.body;
    const userId = req.user._id;
    const user = req.user;

    if (!items || items.length === 0 || totalAmount <= 0) {
      return res.status(400).json({ message: 'Invalid order data' });
    }

    // Generate unique transaction ID
    const txnid = `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Prepare PayU request data
    const payuData = {
      key: PAYU_MERCHANT_KEY,
      salt: PAYU_MERCHANT_SALT,
      txnid: txnid,
      amount: totalAmount.toString(),
      productinfo: 'Website Builder Credits',
      firstname: user.name || 'User',
      email: user.email,
      phone: user.phone || '',
      surl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard/my-plan?success=true`,
      furl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard/my-plan?failed=true`,
      curl: `${process.env.FRONTEND_URL || 'http://localhost:5173'}/dashboard/my-plan?cancelled=true`,
      hash: ''
    };

    // Generate hash
    payuData.hash = generatePayUHash(payuData);

    // Save payment record
    const payment = await Payment.create({
      userId,
      payuOrderId: txnid,
      amount: totalAmount,
      currency: 'INR',
      items: items.map(item => ({
        featureKey: item.featureKey,
        quantity: item.quantity,
        price: item.price
      })),
      status: 'pending',
      metadata: {
        payuData: payuData
      }
    });

    res.json({
      orderId: txnid,
      payuData: payuData,
      paymentId: payment._id
    });

  } catch (error) {
    console.error('Create PayU order error:', error);
    res.status(500).json({ message: 'Failed to create PayU order' });
  }
};

// Handle PayU payment response
export const handlePayUResponse = async (req, res) => {
  try {
    const { txnid, status, hash, amount } = req.body;
    const userId = req.user._id;

    // Find the payment record
    const payment = await Payment.findOne({ 
      payuOrderId: txnid, 
      userId
    });

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }

    // Verify hash
    const expectedHash = generatePayUHash({
      key: PAYU_MERCHANT_KEY,
      salt: PAYU_MERCHANT_SALT,
      txnid: txnid,
      amount: amount,
      productinfo: 'Website Builder Credits',
      firstname: req.user.name || 'User',
      email: req.user.email
    });

    if (hash !== expectedHash) {
      payment.status = 'failed';
      payment.updatedAt = new Date();
      await payment.save();
      return res.status(400).json({ message: 'Invalid payment hash' });
    }

    // Update payment status
    if (status === 'success') {
      payment.status = 'completed';
      payment.payuTransactionId = req.body.mihpayid || txnid;
      payment.updatedAt = new Date();
      await payment.save();

      // Update user feature access
      const userFeatureAccess = await UserFeatureAccess.findOne({ userId });
      if (userFeatureAccess) {
        for (const item of payment.items) {
          const feature = userFeatureAccess.features[item.featureKey];
          if (feature) {
            feature.value += item.quantity;
            if (!feature.enabled) {
              feature.enabled = true;
            }
          }
        }
        await userFeatureAccess.save();
      }

      res.json({ 
        success: true, 
        message: 'Payment completed successfully',
        payment: payment,
        featureAccess: userFeatureAccess
      });
    } else {
      payment.status = 'failed';
      payment.updatedAt = new Date();
      await payment.save();

      res.status(400).json({ message: 'Payment failed' });
    }

  } catch (error) {
    console.error('Handle PayU response error:', error);
    res.status(500).json({ message: 'Failed to process payment response' });
  }
};

// Get payment history
export const getPaymentHistory = async (req, res) => {
  try {
    const userId = req.user._id;
    const payments = await Payment.find({ userId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(payments);
  } catch (error) {
    console.error('Get payment history error:', error);
    res.status(500).json({ message: 'Failed to get payment history' });
  }
}; 