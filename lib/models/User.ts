import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password_hash: string;
  user_type: 'job_seeker' | 'company' | 'authority';
  created_at?: Date;
  updated_at?: Date;
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },  // <-- added name
  email: { type: String, required: true, unique: true },
  password_hash: { type: String, required: true },
  user_type: { type: String, enum: ['job_seeker', 'company', 'authority'], required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export default User;
