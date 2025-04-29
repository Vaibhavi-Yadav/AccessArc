import mongoose, { Document, Schema } from 'mongoose';

export interface IFeedback extends Document {
  user_id: mongoose.Types.ObjectId;
  feedback_type: 'job' | 'scheme' | 'platform';
  message: string;
  rating: number;
  submitted_at: Date;
}

const FeedbackSchema = new Schema<IFeedback>({
  user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  feedback_type: { type: String, enum: ['job', 'scheme', 'platform'], required: true },
  message: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  submitted_at: { type: Date, default: Date.now }
});

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema);
