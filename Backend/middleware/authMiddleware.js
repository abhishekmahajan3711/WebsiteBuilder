import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import UserFeatureAccess from '../models/UserFeatureAccess.js';

const authMiddleware = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    if (!auth || !auth.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token' });
    }
    const token = auth.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
      return res.status(500).json({ message: 'Server configuration error' });
    }
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(401).json({ message: 'User not found' });
    const featureAccess = await UserFeatureAccess.findOne({ userId: user._id });
    req.user = user;
    req.featureAccess = featureAccess;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default authMiddleware; 