// pages/api/profile/me.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import UserProfile from '@/lib/models/UserProfile';
import authMiddleware from '@/middleware/auth';
import { IUser } from '@/lib/models/User';

interface AuthenticatedRequest extends NextApiRequest {
  user?: IUser;
}

export default async function handler(
  req: AuthenticatedRequest, 
  res: NextApiResponse
) {
  await authMiddleware(req, res, async () => {
    if (req.method !== 'GET') {
      return res.status(405).json({ message: 'Method not allowed' });
    }

    try {
      await connectDB();
      
      if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
      const userProfile = await UserProfile.findOne({ user_id: req.user._id });
      
      if (!userProfile) {
        return res.status(404).json({ message: 'Profile not found' });
      }
      
      return res.status(200).json({ profile: userProfile });
    } catch (error) {
      console.error('Profile retrieval error:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  });
}