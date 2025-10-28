import mongoose from 'mongoose';

const templateSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // e.g., 'modern_doctor_v1'
  name: String,
  role: String, // doctor, teacher, lawyer, etc.
  category: { type: String, enum: ['basic', 'modern', 'premium', 'pro'], default: 'basic' },
  thumbnail: String,
  availableComponents: [String], // e.g., ['hero', 'about', 'services', 'contact']
}, { timestamps: true });

export default mongoose.model('Template', templateSchema);
