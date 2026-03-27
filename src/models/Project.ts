import mongoose, { Schema, Document } from "mongoose";

export interface IProject extends Document {
  title: string;
  description: string;
  techStack: string[];
  image: string;
  liveLink?: string;
  order: number;
  createdAt: Date;
}

const ProjectSchema: Schema = new Schema({
  title: {
    type: String,
    required: [true, "Please provide a title for this project."],
  },
  description: {
    type: String,
    required: [true, "Please provide a description."],
  },
  techStack: {
    type: [String],
    required: [true, "Please provide the tech stack."],
  },
  image: {
    type: String,
    required: [true, "Please provide an image url."],
  },
  liveLink: {
    type: String,
    required: false,
  },
  order: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
