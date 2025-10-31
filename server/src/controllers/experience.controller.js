import { Experience } from "../models/experience.model.js";


export const getAllExperiences = async (req, res) => {
  try {
    // You can add pagination here later
    const experiences = await Experience.find({}).select(
      "title location price imageUrl"
    );
    res.status(200).json({ success: true, data: experiences });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};


export const getExperienceById = async (req, res) => {
  try {
    const { id } = req.params;
    const experience = await Experience.findById(id);

    if (!experience) {
      return res
        .status(404)
        .json({ success: false, message: "Experience not found" });
    }

    
    experience.availableSlots = experience.availableSlots.filter(
      (slot) => slot.bookedSlots < slot.totalSlots
    );

    res.status(200).json({ success: true, data: experience });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};