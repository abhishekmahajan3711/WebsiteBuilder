import mongoose from 'mongoose';

const featureAccessSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', unique: true },
  features: {
    publish_limit: {
      enabled: { type: Boolean, default: true },
      value: { type: Number, default: 3 },
      scope: { type: String, default: 'global' }//not required
    },
    template_access: {
      enabled: { type: Boolean, default: true },
      value: { type: String, enum: ['basic', 'modern', 'premium'], default: 'basic' },
      scope: { type: String, default: 'global' }
    },
    watermark_removal: {//done
      enabled: { type: Boolean, default: true },
      value:{type:Number,default:3},
      expiresAt: Date,//not required
      scope: { type: String, enum: ['global', 'perWebsite'], default: 'perWebsite' },//not required
      websites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Website' }]//not required
    },
    title:{ //done
      enabled: { type: Boolean, default: true },
      value:{type:Number,default:3},
      expiresAt: Date, //not required
      scope: { type: String, enum: ['global', 'perWebsite'], default: 'perWebsite' },//not required
      websites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Website' }]//not required
    },
    logoUrl:{ //done
      enabled: { type: Boolean, default: true },
      value:{type:Number,default:3},
      expiresAt: Date,//not required
      scope: { type: String, enum: ['global', 'perWebsite'], default: 'perWebsite' },//not required
      websites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Website' }]//not required
    }, 
    store_images: { //done
      enabled: { type: Boolean, default: true },//not required
      value: { type: Number, default: 10 },
      scope: { type: String, default: 'global' }//not required
    },
    export_website: {
      enabled: { type: Boolean, default: true },
      value: { type: Number, default: 3 }, // default 3 export credits
      scope: { type: String, default: 'global' }
    },
    qr_code: {
      enabled: { type: Boolean, default: true },
      value: { type: Number, default: 3 },
      scope: { type: String, default: 'global' }
    }
  }
}, { timestamps: true });

export default mongoose.model('UserFeatureAccess', featureAccessSchema);
