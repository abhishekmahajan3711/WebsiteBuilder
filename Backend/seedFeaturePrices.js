import mongoose from 'mongoose';
import FeaturePrice from './models/FeaturePrice.js';

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/website_builder';

const prices = [
  { key: 'publish_limit', price: 10 },
  { key: 'watermark_removal', price: 5 },
  { key: 'title', price: 7 },
  { key: 'logoUrl', price: 7 },
  { key: 'store_images', price: 2 },
  { key: 'export_website', price: 8 },
];

async function seed() {
  await mongoose.connect("mongodb+srv://abhipersonal3711:apfcCJ9SxdvUdVpf@cluster0.ndxek4f.mongodb.net/website_builder?retryWrites=true&w=majority&appName=Cluster0");
  await FeaturePrice.deleteMany({});
  await FeaturePrice.insertMany(prices);
  console.log('Feature prices seeded!');
  await mongoose.disconnect();
}

seed(); 