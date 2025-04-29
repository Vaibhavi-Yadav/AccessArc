// pages/api/auth/login.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import { comparePassword, generateToken } from '@/lib/auth';

interface LoginRequest {
  email: string;
  password: string;
}

export default async function handler(
  req: NextApiRequest, 
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    
    const { email, password } = req.body as LoginRequest;
    
    // Find the user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Verify password
    const isPasswordValid = await comparePassword(password, user.password_hash);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    
    // Generate JWT token
    const token = generateToken(user._id);
    
    // Return user info and token (excluding password)
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      user_type: user.user_type,
    };
    
    return res.status(200).json({ 
      message: 'Login successful',
      user: userWithoutPassword,
      token 
    });
    
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Server error during login' });
  }
}