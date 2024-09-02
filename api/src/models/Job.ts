import { Schema, Document, model } from 'mongoose';

//Definicion de la interfaz de trabajos para poder guardar sus atributos
export interface JobDocument extends Document {
  userId: Schema.Types.ObjectId;
  rootUrl: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  urlsFound: string[];
  pendingUrls: string[];
}

//Definicion de la entidad en base de datos
const jobSchema = new Schema<JobDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  rootUrl: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'failed'],
    default: 'pending',
  },
  urlsFound: {
    type: [String],
    default: [],
  },
  pendingUrls: {
    type: [String],
    default: [],
  },
});

export const Job = model<JobDocument>('Job', jobSchema);