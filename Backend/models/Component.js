import mongoose from 'mongoose';

const componentSchema = new mongoose.Schema({
  type: { type: String, required: true }, // e.g., 'hero', 'about', 'custom_card'
  category: { type: String, enum: ['basic', 'modern', 'premium', 'pro'], required: true },
  order: { type: Number, required: true },
  customName: { type: String }, // "student Hero Section"
  content: { type: mongoose.Schema.Types.Mixed },
  style: { type: mongoose.Schema.Types.Mixed },
  customFields: { type: mongoose.Schema.Types.Mixed },
});

export { componentSchema };
export default mongoose.model('Component', componentSchema, 'components');
