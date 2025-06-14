import mongoose, { Schema, Document, Model } from "mongoose";

export interface IStory extends Document {
  story: string;
  lat: number; // Optional latitude field
  lng: number; // Optional longitude field
  createdAt: Date;
}

const StorySchema = new Schema<IStory>(
  {
    story: { type: String, required: true },
    lat: { type: Number, required: true }, // Optional latitude field
    lng: { type: Number, required: true }, // Optional longitude field
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Story: Model<IStory> = mongoose.models.Story || mongoose.model<IStory>("Story", StorySchema);

export default Story;
