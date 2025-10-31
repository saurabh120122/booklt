import { Router } from "express";
import {
  getAllExperiences,
  getExperienceById,
} from "../controllers/experience.controller.js";
import {
  createBooking,
  validatePromoCode,
} from "../controllers/booking.controller.js";

const router = Router();

router.get("/experiences", getAllExperiences);
router.get("/experiences/:id", getExperienceById);

router.post("/bookings", createBooking);
router.post("/promo/validate", validatePromoCode);

export default router;