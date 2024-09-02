import mongoose, { Document, Schema } from 'mongoose';

export interface IJob extends Document {
  userId: string;
  rootUrl: string;
  status: string;
  urlsFound: string[];
  pendingUrls: string[];
  createdAt: Date;
}

const JobSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rootUrl: { type: String, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  urlsFound: { type: [String], default: [] },
  pendingUrls: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const Job = mongoose.model<IJob>('Job', JobSchema);
