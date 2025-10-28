import mongoose from 'mongoose';

const featurePriceSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model('FeaturePrice', featurePriceSchema); 