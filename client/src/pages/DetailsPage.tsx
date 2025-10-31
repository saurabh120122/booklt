import React, { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchExperienceById } from "../services/api";

// --- Types ---
type Slot = {
  _id: string;
  startTime: string;
  endTime: string;
  totalSlots: number;
  bookedSlots: number;
};

type ExperienceDetails = {
  _id: string;
  title: string;
  location: string;
  price: number;
  description: string;
  imageUrl: string;
  availableSlots: Slot[];
};

// --- Helper Functions ---
const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

const formatTime = (dateString: string): string => {
  return new Date(dateString).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

const getDay = (dateString: string): string => {
  return new Date(dateString).toISOString().split("T")[0];
};

// --- Details Page Component (UPDATED) ---
const DetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [experience, setExperience] = useState<ExperienceDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<Slot | null>(null);
  
  // --- Quantity state is now used ---
  const [quantity, setQuantity] = useState(1);
  const TAX_RATE = 0.06;
  const subtotal = (experience?.price || 0) * quantity; // Recalculates
  const taxes = subtotal * TAX_RATE;
  const total = subtotal + taxes;
  
  const isConfirmButtonActive = selectedDate !== null && selectedSlot !== null;

  useEffect(() => {
    if (!id) return;
    const loadDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchExperienceById(id);
        setExperience(data);
      } catch (err) {
        setError("Failed to load details.");
      } finally {
        setLoading(false);
      }
    };
    loadDetails();
  }, [id]);

  const uniqueDates = useMemo(() => {
    if (!experience) return [];
    const dates = new Set<string>();
    experience.availableSlots.forEach(slot => {
      dates.add(getDay(slot.startTime));
    });
    return Array.from(dates).sort();
  }, [experience]);

  const slotsForSelectedDate = useMemo(() => {
    if (!experience || !selectedDate) return [];
    return experience.availableSlots.filter(
      (slot) => getDay(slot.startTime) === selectedDate
    );
  }, [experience, selectedDate]);
  
  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot: Slot) => {
    setSelectedSlot(slot);
  };

  const handleConfirmClick = () => {
    if (isConfirmButtonActive && experience && selectedSlot) {
      navigate("/checkout", {
        state: {
          experience: {
            _id: experience._id,
            title: experience.title,
            imageUrl: experience.imageUrl,
            price: experience.price,
          },
          slot: selectedSlot,
          quantity: quantity, // <-- Pass the selected quantity
          totalPrice: total,
          subtotal: subtotal,
          taxes: taxes,
        },
      });
    }
  };

  if (loading) return <p className="text-center p-10">Loading details...</p>;
  if (error) return <p className="text-center p-10 text-red-500">{error}</p>;
  if (!experience) return <p className="text-center p-10">Experience not found.</p>;

  return (
    <div className="container mx-auto p-6">
      <Link to="/" className="text-sm font-medium text-gray-700 mb-4 inline-block">
        &larr; Back to all
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column --- */}
        <div className="lg:col-span-2">
          <img src={experience.imageUrl} alt={experience.title} className="w-full h-[500px] object-cover rounded-lg shadow-lg mb-6" />
          <h1 className="text-4xl font-bold mb-4">{experience.title}</h1>
          <p className="text-lg text-gray-700 mb-8">{experience.description}</p>
          
          <h2 className="text-2xl font-semibold mb-4">Choose date</h2>
          <div className="flex flex-wrap gap-3 mb-8">
            {uniqueDates.length > 0 ? uniqueDates.map((date) => (
              <button
                key={date}
                onClick={() => handleDateSelect(date)}
                className={`px-4 py-2 border rounded-md font-medium ${
                  selectedDate === date
                    ? "bg-black text-white"
                    : "bg-white hover:border-black"
                }`}
              >
                {formatDate(date)}
              </button>
            )) : <p>No dates available.</p>}
          </div>
          
          {selectedDate && (
            <>
              <h2 className="text-2xl font-semibold mb-4">Choose time</h2>
              <div className="flex flex-wrap gap-3 mb-8">
                {slotsForSelectedDate.length > 0 ? slotsForSelectedDate.map((slot) => (
                  <button
                    key={slot._id}
                    onClick={() => handleSlotSelect(slot)}
                    className={`px-4 py-2 border rounded-md font-medium ${
                      selectedSlot?._id === slot._id
                        ? "bg-black text-white"
                        : "bg-white hover:border-black"
                    }`}
                  >
                    {formatTime(slot.startTime)} - {formatTime(slot.endTime)}
                  </button>
                )) : <p>No times available for this date.</p>}
              </div>
            </>
          )}
        </div>
        
        {/* --- Right Column (Booking Box) --- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
            <p className="text-lg mb-4">
              Starts at <span className="font-bold text-2xl">₹{experience.price}</span>
            </p>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-700">Quantity</span>
              <div className="flex items-center gap-4">
                {/* --- UPDATED BUTTONS --- */}
                <button 
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full border border-gray-400 font-bold"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => setQuantity(q => Math.min(10, q + 1))} // Max 10
                  className="w-8 h-8 rounded-full border border-gray-400 font-bold"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="space-y-2 border-t pt-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes</span>
                <span>₹{taxes.toFixed(0)}</span>
              </div>
              <div className="flex justify-between font-bold text-xl pt-2">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>
            
            <button
              onClick={handleConfirmClick}
              disabled={!isConfirmButtonActive}
              className={`w-full py-3 mt-6 rounded-lg font-bold text-lg ${
                isConfirmButtonActive
                  ? "bg-brand-yellow hover:bg-yellow-400"
                  : "bg-brand-gray-dark text-gray-500 cursor-not-allowed"
              }`}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;