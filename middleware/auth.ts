// middleware/auth.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { verifyToken } from '@/lib/auth';
import User, { IUser } from '@/lib/models/User';
import connectDB from '@/lib/db';

interface AuthenticatedRequest extends NextApiRequest {
  user?: IUser;
}

type NextFunction = () => Promise<void>;

export default async function authMiddleware(
  req: AuthenticatedRequest, 
  res: NextApiResponse, 
  next: NextFunction
) {
  try {
    // Get token from header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token required' });
    }
    
    const token = authHeader.split(' ')[1];
    
    // Verify token
    const decoded = verifyToken(token);
    if (!decoded) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    
    // Check if user exists
    await connectDB();
    const user = await User.findById(decoded.userId).select('-password_hash');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }
    
    // Add user to request object
    req.user = user;
    await next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({ message: 'Server error' });
  }
}