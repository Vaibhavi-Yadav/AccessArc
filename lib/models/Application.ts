import mongoose, { Document, Schema } from 'mongoose';

export interface IApplication extends Document {
  job_id: mongoose.Types.ObjectId;
  applicant_id: mongoose.Types.ObjectId;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  applied_date: Date;
}

const ApplicationSchema = new Schema<IApplication>({
  job_id: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
  applicant_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'reviewed', 'accepted', 'rejected'], default: 'pending' },
  applied_date: { type: Date, default: Date.now }
});

export default mongoose.models.Application || mongoose.model<IApplication>('Application', ApplicationSchema);
