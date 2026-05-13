import mongoose from "mongoose";

const greetingSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true
    },
    userName: {
      type: String,
      required: true,
      trim: true
    },
    templateId: {
      type: String,
      required: true
    },
    templateImage: {
      type: String,
      required: true
    },
    category: {
      type: String,
      required: true
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

const Greeting = mongoose.model("Greeting", greetingSchema);

export default Greeting;
