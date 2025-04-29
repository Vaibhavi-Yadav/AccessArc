import mongoose, { Document, Schema } from 'mongoose';

export interface ISchemeApplication extends Document {
  scheme_id: mongoose.Types.ObjectId;
  applicant_id: mongoose.Types.ObjectId;
  status: 'pending' | 'approved' | 'rejected';
  applied_date: Date;
}

const SchemeApplicationSchema = new Schema<ISchemeApplication>({
  scheme_id: { type: Schema.Types.ObjectId, ref: 'Scheme', required: true },
  applicant_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  applied_date: { type: Date, default: Date.now }
});

export default mongoose.models.SchemeApplication || mongoose.model<ISchemeApplication>('SchemeApplication', SchemeApplicationSchema);
