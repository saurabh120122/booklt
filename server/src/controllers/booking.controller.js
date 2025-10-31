import { Booking } from "../models/booking.model.js";
import { Experience } from "../models/experience.model.js";
import mongoose from "mongoose";
import { sendBookingConfirmationEmail } from "../utils/email.js"; // <-- Import the email function

// POST /promo/validate
export const validatePromoCode = async (req, res) => {
  const { promoCode } = req.body;
  
  const validCodes = {
    SAVE10: { type: "percentage", value: 10 },
    FLAT100: { type: "flat", value: 100 },
  };

  const promo = validCodes[promoCode];

  if (promo) {
    res.status(200).json({ success: true, data: promo });
  } else {
    res.status(404).json({ success: false, message: "Invalid promo code" });
  }
};

// POST /bookings
export const createBooking = async (req, res) => {
  const { experienceId, slotId, userName, userEmail, pricePaid, promoCodeUsed } =
    req.body;

  if (!experienceId || !slotId || !userName || !userEmail || pricePaid === undefined) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const experience = await Experience.findById(experienceId).session(session);
    if (!experience) {
      throw new Error("Experience not found");
    }

    const slot = experience.availableSlots.id(slotId);
    if (!slot) {
      throw new Error("Slot not found");
    }

    if (slot.bookedSlots >= slot.totalSlots) {
      throw new Error("This slot is already full");
    }

    slot.bookedSlots += 1; // Note: This assumes quantity is 1
    await experience.save({ session });

    const newBooking = new Booking({
      experience: experienceId,
      slot: slotId,
      userName,
      userEmail,
      bookingDate: slot.startTime,
      pricePaid,
      promoCodeUsed,
    });
    await newBooking.save({ session });
    
    await session.commitTransaction();

    // --- SEND EMAIL (AFTER transaction is successful) ---
    try {
      // We pass the newBooking and the experience title to the email function
      await sendBookingConfirmationEmail({
        ...newBooking.toObject(),
        experience: { title: experience.title } 
      });
    } catch (emailError) {
      console.error("Booking was successful, but email failed to send:", emailError);
    }
    // --- End Email Send ---

    res.status(201).json({
      success: true,
      message: "Booking confirmed!",
      data: newBooking,
    });
  } catch (error) {
    await session.abortTransaction();
    res
      .status(500)
      .json({ success: false, message: error.message || "Booking failed" });
  } finally {
    session.endSession();
  }
};