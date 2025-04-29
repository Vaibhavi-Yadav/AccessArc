import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProfile extends Document {
  user_id: mongoose.Types.ObjectId;
  disability_type?: string;
  age?: number;
  gender?: string;
  education_level?: string;
  skills: string[];
  experience?: string;
  accessibility_needs: string[];
}

const UserProfileSchema = new Schema<IUserProfile>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  disability_type: { type: String },
  age: { type: Number },
  gender: { type: String },
  education_level: { type: String },
  skills: { type: [String], default: [] },
  experience: { type: String },
  accessibility_needs: { type: [String], default: [] }
});

export default mongoose.models.UserProfile || mongoose.model<IUserProfile>('UserProfile', UserProfileSchema);
