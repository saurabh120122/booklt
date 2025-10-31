import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import { Experience } from "./models/experience.model.js";

// Load env vars
dotenv.config();

// Connect to DB
connectDB();

const experiences = [
  {
    title: "Kayaking in Udupi",
    location: "Udupi",
    price: 999,
    description: "Curated small-group experience. Certified guide. Safety first with gear included.",
    imageUrl: "https://images.unsplash.com/photo-1519904981042-20c4935c630e?auto=format&fit=crop&w=1400",
    availableSlots: [
      { startTime: new Date("2025-11-20T09:00:00Z"), endTime: new Date("2025-11-20T11:00:00Z"), totalSlots: 10, bookedSlots: 0 },
      { startTime: new Date("2025-11-20T12:00:00Z"), endTime: new Date("2025-11-20T14:00:00Z"), totalSlots: 10, bookedSlots: 2 },
      { startTime: new Date("2025-11-21T09:00:00Z"), endTime: new Date("2025-11-21T11:00:00Z"), totalSlots: 10, bookedSlots: 0 },
      { startTime: new Date("2025-11-22T09:00:00Z"), endTime: new Date("2025-11-22T11:00:00Z"), totalSlots: 5, bookedSlots: 5 }, // Full
      { startTime: new Date("2025-11-23T14:00:00Z"), endTime: new Date("2025-11-23T16:00:00Z"), totalSlots: 8, bookedSlots: 1 },
      { startTime: new Date("2025-11-24T09:00:00Z"), endTime: new Date("2025-11-24T11:00:00Z"), totalSlots: 8, bookedSlots: 0 },
    ],
  },
  {
    title: "Nandi Hills Sunrise",
    location: "Bangalore",
    price: 899,
    description: "Witness the breathtaking sunrise from Nandi Hills. A perfect getaway from the city.",
    imageUrl: "https://images.unsplash.com/photo-1601755100088-c7096c4d7e1f?auto=format&fit=crop&w=1400",
    availableSlots: [
      { startTime: new Date("2025-11-20T05:00:00Z"), endTime: new Date("2025-11-20T08:00:00Z"), totalSlots: 20, bookedSlots: 5 },
      { startTime: new Date("2025-11-21T05:00:00Z"), endTime: new Date("2025-11-21T08:00:00Z"), totalSlots: 20, bookedSlots: 8 },
      { startTime: new Date("2025-11-22T05:00:00Z"), endTime: new Date("2025-11-22T08:00:00Z"), totalSlots: 20, bookedSlots: 1 },
    ],
  },
  {
    title: "Coorg Coffee Trail",
    location: "Coorg",
    price: 1299,
    description: "A guided walk through lush coffee plantations. Learn about the bean-to-cup process.",
    imageUrl: "https://images.unsplash.com/photo-1509783236416-c8ad59f4e8f3?auto=format&fit=crop&w=1400",
    availableSlots: [
      { startTime: new Date("2025-11-24T10:00:00Z"), endTime: new Date("2025-11-24T13:00:00Z"), totalSlots: 12, bookedSlots: 3 },
      { startTime: new Date("2025-11-25T10:00:00Z"), endTime: new Date("2025-11-25T13:00:00Z"), totalSlots: 12, bookedSlots: 0 },
    ],
  },
  {
    title: "Sunderban Boat Cruise",
    location: "Sunderban",
    price: 2499,
    description: "Explore the dense mangroves and spot wildlife on a relaxing boat cruise.",
    imageUrl: "https://images.unsplash.com/photo-1541627841943-85f024f2b11e?auto=format&fit=crop&w=1400",
    availableSlots: [
      { startTime: new Date("2025-11-25T11:00:00Z"), endTime: new Date("2025-11-25T15:00:00Z"), totalSlots: 15, bookedSlots: 2 },
    ]
  },
  {
    title: "Manali Bungee Jumping",
    location: "Manali",
    price: 1999,
    description: "Experience the ultimate thrill with a breathtaking bungee jump over the river.",
    imageUrl: "https://images.unsplash.com/photo-1620027814965-f67935c13c4a?auto=format&fit=crop&w=1400",
    availableSlots: [
      { startTime: new Date("2025-11-26T12:00:00Z"), endTime: new Date("2025-11-26T13:00:00Z"), totalSlots: 10, bookedSlots: 1 },
      { startTime: new Date("2025-11-26T14:00:00Z"), endTime: new Date("2025-11-26T15:00:00Z"), totalSlots: 10, bookedSlots: 0 },
    ]
  },
  {
    title: "Goa Beach Parasailing",
    location: "Goa",
    price: 1499,
    description: "Soar high above the beautiful beaches of Goa. An unforgettable aerial experience.",
    imageUrl: "https://images.unsplash.com/photo-1590510520697-368731b716b6?auto=format&fit=crop&w=1400",
    availableSlots: [
      { startTime: new Date("2025-11-28T13:00:00Z"), endTime: new Date("2025-11-28T13:30:00Z"), totalSlots: 15, bookedSlots: 3 },
      { startTime: new Date("2025-11-28T14:00:00Z"), endTime: new Date("2025-11-28T14:30:00Z"), totalSlots: 15, bookedSlots: 1 },
    ]
  },
  {
    title: "Rishikesh River Rafting",
    location: "Rishikesh",
    price: 1799,
    description: "Conquer the rapids of the Ganges. A 16km rafting trip for adventure lovers.",
    imageUrl: "https://images.unsplash.com/photo-1600981383309-54871c8535b1?auto=format&fit=crop&w=1400",
    availableSlots: [
      { startTime: new Date("2025-11-22T10:00:00Z"), endTime: new Date("2025-11-22T14:00:00Z"), totalSlots: 18, bookedSlots: 5 },
    ]
  },
  {
    title: "Jaipur Hot Air Balloon",
    location: "Jaipur",
    price: 2999,
    description: "Get a bird's eye view of the Pink City and its majestic forts at sunrise.",
    imageUrl: "https://images.unsplash.com/photo-1533580547610-33758371efab?auto=format&fit=crop&w=1400",
    availableSlots: [
      { startTime: new Date("2025-11-29T06:00:00Z"), endTime: new Date("2025-11-29T07:00:00Z"), totalSlots: 10, bookedSlots: 2 },
    ]
  }
];

// --- Seeding Function ---
const importData = async () => {
  try {
    await Experience.deleteMany();
    console.log("Old data cleared...");
    await Experience.insertMany(experiences);
    console.log("Data successfully imported!");
    process.exit();
  } catch (error) {
    console.error("Error importing data:", error);
    process.exit(1);
  }
};

importData();