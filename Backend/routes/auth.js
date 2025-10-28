import { Router } from 'express';
import { signup, signin, addImageCredits, decrementImageCredit, decrementPublishLimit, incrementPublishLimit, decrementExportCredit, addExportCredits, forgotPassword, resetPassword, updateProfile, changePassword, sendVerificationEmail, verifyEmail } from '../controllers/authController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = Router();

router.post('/signup', signup);
router.post('/signin', signin);
router.post('/add-image-credits', authMiddleware, addImageCredits);
router.post('/decrement-image-credit', authMiddleware, decrementImageCredit);
router.post('/decrement-publish-limit', authMiddleware, decrementPublishLimit);
router.post('/increment-publish-limit', authMiddleware, incrementPublishLimit);
router.post('/decrement-export-credit', authMiddleware, decrementExportCredit);
router.post('/add-export-credits', authMiddleware, addExportCredits);

// Password reset routes
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Profile management routes
router.put('/update-profile', authMiddleware, updateProfile);
router.put('/change-password', authMiddleware, changePassword);
router.post('/send-verification-email', authMiddleware, sendVerificationEmail);
router.post('/verify-email', verifyEmail);

// Get current user from token
router.get('/me', authMiddleware, async (req, res) => {
  const user = req.user;
  const featureAccess = req.featureAccess;
  res.json({ user: { _id: user._id, name: user.name, email: user.email, phone: user.phone, emailVerified: user.emailVerified }, featureAccess });
});

export default router; 