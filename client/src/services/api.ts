import axios from "axios";

// Create an Axios instance
const api = axios.create({
  baseURL: "/api/v1",
  withCredentials: true,
});

// --- API Functions ---

// GET /experiences 
export const fetchExperiences = async () => {
  const response = await api.get("/experiences");
  return response.data.data; // Assuming backend returns { success: true, data: [...] }
};

// GET /experiences/:id 
export const fetchExperienceById = async (id: string) => {
  const response = await api.get(`/experiences/${id}`);
  return response.data.data;
};

// POST /promo/validate 
export const validatePromo = async (promoCode: string) => {
  const response = await api.post("/promo/validate", { promoCode });
  return response.data.data;
};

// POST /bookings 
export const createBooking = async (bookingDetails: any) => {
  const response = await api.post("/bookings", bookingDetails);
  return response.data;
};

export default api;