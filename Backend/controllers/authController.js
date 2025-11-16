import User from '../models/User.js';
import UserFeatureAccess from '../models/UserFeatureAccess.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { sendPasswordResetEmail, sendWelcomeEmail, sendVerificationEmail as sendVerificationEmailUtil } from '../utils/emailService.js';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required');
}

export const signup = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already exists' });
    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, passwordHash });
    // Create UserFeatureAccess with default values
    await UserFeatureAccess.create({ userId: user._id });
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    
    // Send welcome email (optional - can be disabled)
    try {
      await sendWelcomeEmail(email, name);
    } catch (emailError) {
      console.error('Failed to send welcome email:', emailError);
      // Don't fail the signup if email fails
    }
    
    res.status(201).json({ user: { _id: user._id, name, email, phone }, token });
  } catch (err) {
    res.status(500).json({ message: 'Signup error', error: err.message });
  }
};

export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Generate JWT
    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    // Get feature access
    const featureAccess = await UserFeatureAccess.findOne({ userId: user._id });

    // Return token, user, and feature access
    res.json({
      token,
      user: { _id: user._id, name: user.name, email: user.email, phone: user.phone },
      featureAccess
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const addImageCredits = async (req, res) => {
  try {
    const userId = req.user._id;
    const { credits } = req.body;
    if (!credits || credits <= 0) {
      return res.status(400).json({ message: 'Invalid credits value' });
    }
    const featureAccess = await (await import('../models/UserFeatureAccess.js')).default.findOne({ userId });
    if (!featureAccess) {
      return res.status(404).json({ message: 'Feature access not found' });
    }
    featureAccess.features.store_images.value += credits;
    await featureAccess.save();
    res.json({ featureAccess });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add image credits', error: err.message });
  }
};

export const decrementImageCredit = async (req, res) => {
  try {
    const userId = req.user._id;
    const featureAccess = await (await import('../models/UserFeatureAccess.js')).default.findOne({ userId });
    if (!featureAccess) {
      return res.status(404).json({ message: 'Feature access not found' });
    }
    if (featureAccess.features.store_images.value < 1) {
      return res.status(402).json({ message: 'Not enough image credits.' });
    }
    featureAccess.features.store_images.value -= 1;
    await featureAccess.save();
    res.json({ featureAccess });
  } catch (err) {
    res.status(500).json({ message: 'Failed to decrement image credit', error: err.message });
  }
};

export const decrementPublishLimit = async (req, res) => {
  try {
    const userId = req.user._id;
    const featureAccess = await (await import('../models/UserFeatureAccess.js')).default.findOne({ userId });
    if (!featureAccess) {
      return res.status(404).json({ message: 'Feature access not found' });
    }
    if (featureAccess.features.publish_limit.value < 1) {
      return res.status(402).json({ message: 'Not enough publish credits.' });
    }
    featureAccess.features.publish_limit.value -= 1;
    await featureAccess.save();
    res.json({ featureAccess });
  } catch (err) {
    res.status(500).json({ message: 'Failed to decrement publish limit', error: err.message });
  }
};

export const incrementPublishLimit = async (req, res) => {
  try {
    const userId = req.user._id;
    const featureAccess = await (await import('../models/UserFeatureAccess.js')).default.findOne({ userId });
    if (!featureAccess) {
      return res.status(404).json({ message: 'Feature access not found' });
    }
    featureAccess.features.publish_limit.value += 1;
    await featureAccess.save();
    res.json({ featureAccess });
  } catch (err) {
    res.status(500).json({ message: 'Failed to increment publish limit', error: err.message });
  }
};

export const decrementExportCredit = async (req, res) => {
  try {
    const userId = req.user._id;
    const featureAccess = await (await import('../models/UserFeatureAccess.js')).default.findOne({ userId });
    if (!featureAccess) {
      return res.status(404).json({ message: 'Feature access not found' });
    }
    if (featureAccess.features.export_website.value < 1) {
      return res.status(402).json({ message: 'Not enough export credits.' });
    }
    featureAccess.features.export_website.value -= 1;
    await featureAccess.save();
    res.json({ featureAccess });
  } catch (err) {
    res.status(500).json({ message: 'Failed to decrement export credit', error: err.message });
  }
};

export const addExportCredits = async (req, res) => {
  try {
    const userId = req.user._id;
    const { credits } = req.body;
    if (!credits || credits <= 0) {
      return res.status(400).json({ message: 'Invalid credits value' });
    }
    const featureAccess = await (await import('../models/UserFeatureAccess.js')).default.findOne({ userId });
    if (!featureAccess) {
      return res.status(404).json({ message: 'Feature access not found' });
    }
    featureAccess.features.export_website.value += credits;
    await featureAccess.save();
    res.json({ featureAccess });
  } catch (err) {
    res.status(500).json({ message: 'Failed to add export credits', error: err.message });
  }
};

// Forgot Password - Send reset email
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if email exists or not for security
      return res.json({ message: 'If an account with that email exists, a password reset link has been sent.' });
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
    
    // Store reset token in user document
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send password reset email
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const resetUrl = `${frontendUrl}/reset-password/${resetToken}`;
    const emailSent = await sendPasswordResetEmail(email, resetUrl, user.name);
    
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send password reset email. Please try again later.' });
    }
    
    res.json({ 
      message: 'If an account with that email exists, a password reset link has been sent to your email.'
    });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ message: 'Failed to process password reset request' });
  }
};

// Reset Password - Set new password
export const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    
    if (!token || !password) {
      return res.status(400).json({ message: 'Token and password are required' });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user and check if token is valid and not expired
    const user = await User.findOne({ 
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(password, 10);
    
    // Update user password and clear reset token
    user.passwordHash = passwordHash;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({ message: 'Password has been reset successfully' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }
    console.error('Reset password error:', err);
    res.status(500).json({ message: 'Failed to reset password' });
  }
}; 

// Update Profile
export const updateProfile = async (req, res) => {
  try {
    const { name, phone } = req.body;
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    // Only allow name and phone to be updated
    if (name) user.name = name;
    if (phone !== undefined) user.phone = phone;
    await user.save();
    res.json({ 
      message: 'Profile updated successfully',
      user: { _id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (err) {
    console.error('Update profile error:', err);
    res.status(500).json({ message: 'Failed to update profile' });
  }
};

// Change Password
export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user._id;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    if (newPassword.length < 6) {
      return res.status(400).json({ message: 'New password must be at least 6 characters long' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Verify current password
    const isMatch = await bcrypt.compare(currentPassword, user.passwordHash);
    if (!isMatch) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }

    // Hash new password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    user.passwordHash = passwordHash;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('Change password error:', err);
    res.status(500).json({ message: 'Failed to change password' });
  }
};

// Send Email Verification
export const sendVerificationEmail = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (!user.email) {
      return res.status(400).json({ message: 'No email found for user' });
    }
    // Generate verification token
    const verificationToken = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, { expiresIn: '24h' });
    // Store verification token
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = Date.now() + 86400000; // 24 hours
    await user.save();
    // Send verification email
    const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
    const verificationUrl = `${frontendUrl}/verify-email/${verificationToken}`;
    const emailSent = await sendVerificationEmailUtil(user.email, verificationUrl, user.name);
    if (!emailSent) {
      return res.status(500).json({ message: 'Failed to send verification email' });
    }
    res.json({ message: 'Verification email sent successfully' });
  } catch (err) {
    console.error('Send verification email error:', err);
    res.status(500).json({ message: 'Failed to send verification email' });
  }
};

// Verify Email
export const verifyEmail = async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({ message: 'Verification token is required' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user and check if token is valid and not expired
    const user = await User.findOne({ 
      _id: decoded.id,
      emailVerificationToken: token,
      emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }

    // Mark email as verified
    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save();

    res.json({ message: 'Email verified successfully' });
  } catch (err) {
    if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
      return res.status(400).json({ message: 'Invalid or expired verification token' });
    }
    console.error('Verify email error:', err);
    res.status(500).json({ message: 'Failed to verify email' });
  }
}; 