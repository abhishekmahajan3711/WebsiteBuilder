import mongoose from 'mongoose';
import { componentSchema } from './Component.js';

const websiteSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  role: String,
  title: String,
  slug: { type: String, unique: true },
  templateKey: String,
  isPublished: { type: Boolean, default: false },
  language: { type: String, default: 'en' },
  components: [new mongoose.Schema(componentSchema.obj, { _id: false })],
  theme: {
    primaryColor: String,
    fontFamily: String,
    backgroundImage: String,
  },
  watermark: { type:Boolean, default:true},
  seo:{
    title: {type : String, default: 'Website Builder'},
    logoUrl: {type : String, default: ''}
  },
  addOnsUsed: [String],
}, { timestamps: true });

export default mongoose.model('Website', websiteSchema);
