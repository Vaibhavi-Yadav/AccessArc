// pages/api/auth/register.ts
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '@/lib/db';
import User from '@/lib/models/User';
import UserProfile from '@/lib/models/UserProfile';
import { hashPassword, generateToken } from '@/lib/auth';

interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
  disabilityType: string;
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
    
    const { name, email, password, disabilityType } = req.body as RegistrationRequest;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists with this email' });
    }
    
    // Hash password
    const password_hash = await hashPassword(password);
    
    // Create new user
    const newUser = await User.create({
      name,
      email,
      password_hash,
      user_type: 'job_seeker', // For individual registration
    });
    
    // Create user profile with disability type
    await UserProfile.create({
      user_id: newUser._id,
      disability_type: disabilityType,
    });
    
    // Generate JWT token
    const token = generateToken(newUser._id);
    
    // Return user info and token (excluding password)
    const userWithoutPassword = {
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      user_type: newUser.user_type,
    };
    
    return res.status(201).json({ 
      message: 'Registration successful',
      user: userWithoutPassword,
      token 
    });
    
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ message: 'Server error during registration' });
  }
}