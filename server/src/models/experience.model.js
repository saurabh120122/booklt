import mongoose from "mongoose";

// Sub-schema for available slots
const slotSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  totalSlots: {
    type: Number,
    required: true,
    default: 10,
  },
  bookedSlots: {
    type: Number,
    required: true,
    default: 0,
  },
});

const experienceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    // Array of available slots/dates
    availableSlots: [slotSchema],
  },
  { timestamps: true }
);

export const Experience = mongoose.model("Experience", experienceSchema);