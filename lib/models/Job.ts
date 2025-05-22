import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  employer_id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  location: string;
  job_type: string;
  required_skills: string[];
  suitable_for: string[];
  accessibility_features: string[];
  posted_date: Date;
  expiry_date: Date;
}

const JobSchema = new Schema<IJob>({
  employer_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  job_type: { type: String, required: true },
  required_skills: { type: [String], default: [] },
  suitable_for: { type: [String], default: [] },
  accessibility_features: { type: [String], default: [] },
  posted_date: { type: Date, default: Date.now },
  expiry_date: { type: Date, required: true }
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);
