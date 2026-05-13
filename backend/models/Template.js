import mongoose from "mongoose";

const templateSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    premium: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc, ret) => {
        ret.id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

const Template = mongoose.model("Template", templateSchema);

export default Template;
