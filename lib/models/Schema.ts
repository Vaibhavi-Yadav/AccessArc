import mongoose, { Document, Schema } from 'mongoose';

export interface IScheme extends Document {
  authority_id: mongoose.Types.ObjectId;
  title: string;
  description: string;
  eligibility_criteria: string[];
  start_date: Date;
  end_date: Date;
}

const SchemeSchema = new Schema<IScheme>({
  authority_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  eligibility_criteria: { type: [String], default: [] },
  start_date: { type: Date, required: true },
  end_date: { type: Date, required: true }
});

export default mongoose.models.Scheme || mongoose.model<IScheme>('Scheme', SchemeSchema);
