import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  phone: {
    type: String,
    trim: true
  },
  passwordHash: { type: String, required: true },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  emailVerified: { type: Boolean, default: false },
  emailVerificationToken: String,
  emailVerificationExpires: Date,
}, { timestamps: true });

export default mongoose.model('User', userSchema);
