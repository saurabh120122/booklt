import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    experience: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Experience",
      required: true,
    },
    slot: {
      // We store the specific slot ID that was booked
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    userName: {
      type: String,
      required: true,
      trim: true,
    },
    userEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    bookingDate: {
      type: Date,
      required: true,
    },
    pricePaid: {
      type: Number,
      required: true,
    },
    promoCodeUsed: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

export const Booking = mongoose.model("Booking", bookingSchema);