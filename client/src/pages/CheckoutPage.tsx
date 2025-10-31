import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { createBooking, validatePromo } from "../services/api"; // <-- Import validatePromo

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  
  if (!state || !state.experience || !state.slot) {
    React.useEffect(() => { navigate("/") }, [navigate]);
    return null; 
  }

  const { experience, slot, quantity, totalPrice, subtotal, taxes } = state;
  
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- New states for promo logic ---
  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromoCode, setAppliedPromoCode] = useState<string | null>(null);
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [promoLoading, setPromoLoading] = useState(false);
  
  // Calculate final price based on discount
  const finalPrice = Math.max(0, totalPrice - promoDiscount);

  const isButtonDisabled = !fullName || !email || !agreedToTerms || isSubmitting;

  // --- New Handler for "Apply" button ---
  const handleApplyPromo = async () => {
    if (!promoCodeInput) return;
    setPromoLoading(true);
    setPromoError(null);
    try {
      const promoData = await validatePromo(promoCodeInput);
      let discount = 0;
      if (promoData.type === 'percentage') {
        discount = (subtotal * promoData.value) / 100;
      } else if (promoData.type === 'flat') {
        discount = promoData.value;
      }
      setPromoDiscount(discount);
      setAppliedPromoCode(promoCodeInput);
    } catch (err) {
      setPromoError("Invalid promo code.");
      setPromoDiscount(0);
      setAppliedPromoCode(null);
    } finally {
      setPromoLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isButtonDisabled) return;

    setIsSubmitting(true);
    try {
      const bookingDetails = {
        experienceId: experience._id,
        slotId: slot._id,
        userName: fullName,
        userEmail: email,
        pricePaid: finalPrice, // <-- Pass the final price
        promoCodeUsed: appliedPromoCode, // <-- Pass the applied code
      };

      const result = await createBooking(bookingDetails);
      navigate("/result", { state: { success: true, data: result.data } });

    } catch (err: any) {
      const message = err.response?.data?.message || "Booking failed.";
      navigate("/result", { state: { success: false, message: message } });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <Link to={`/details/${experience._id}`} className="text-sm font-medium text-gray-700 mb-4 inline-block">
        &larr; Checkout
      </Link>
      
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- Left Column (Form) --- */}
        <div className="lg:col-span-2 bg-white p-8 rounded-lg shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
              <input 
                type="text" 
                id="fullName" 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full border-brand-gray-dark rounded-md shadow-sm focus:border-brand-yellow focus:ring-brand-yellow"
                placeholder="John Doe"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-brand-gray-dark rounded-md shadow-sm focus:border-brand-yellow focus:ring-brand-yellow"
                placeholder="test@test.com"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="promoCode" className="block text-sm font-medium text-gray-700 mb-1">Promo code</label>
            <div className="flex">
              <input 
                type="text" 
                id="promoCode" 
                value={promoCodeInput}
                onChange={(e) => setPromoCodeInput(e.target.value.toUpperCase())}
                className="w-full border-brand-gray-dark rounded-l-md shadow-sm focus:border-brand-yellow focus:ring-brand-yellow"
                placeholder="e.g. SAVE10"
              />
              <button 
                type="button" 
                onClick={handleApplyPromo}
                disabled={promoLoading}
                className="bg-black text-white px-6 py-2 rounded-r-md font-semibold disabled:bg-gray-500"
              >
                {promoLoading ? "..." : "Apply"}
              </button>
            </div>
            {promoError && <p className="text-red-500 text-sm mt-2">{promoError}</p>}
            {appliedPromoCode && <p className="text-green-600 text-sm mt-2">"{appliedPromoCode}" applied! You saved ₹{promoDiscount.toFixed(0)}.</p>}
          </div>
          <div className="flex items-center">
            <input 
              id="terms" 
              name="terms" 
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="h-4 w-4 text-brand-yellow border-gray-300 rounded focus:ring-brand-yellow"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
              I agree to the terms and safety policy
            </label>
          </div>
        </div>

        {/* --- Right Column (Summary) --- */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-24">
            <h2 className="text-2xl font-semibold mb-4">Summary</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Experience</span>
                <span className="font-medium">{experience.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date</span>
                <span className="font-medium">{new Date(slot.startTime).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time</span>
                <span className="font-medium">{new Date(slot.startTime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Qty</span>
                <span className="font-medium">{quantity}</span>
              </div>
            </div>
            
            <div className="space-y-2 border-t pt-4 mt-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Taxes</span>
                <span>₹{taxes.toFixed(0)}</span>
              </div>
              {/* Show discount if applied */}
              {promoDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({appliedPromoCode})</span>
                  <span>-₹{promoDiscount.toFixed(0)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-xl pt-2">
                <span>Total</span>
                <span>₹{finalPrice.toFixed(0)}</span>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full py-3 mt-6 rounded-lg font-bold text-lg ${
                isButtonDisabled
                  ? "bg-brand-gray-dark text-gray-500 cursor-not-allowed"
                  : "bg-brand-yellow hover:bg-yellow-400"
              }`}
            >
              {isSubmitting ? "Processing..." : "Pay and Confirm"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CheckoutPage;