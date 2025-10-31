import React, { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom"; // <-- 1. Import useOutletContext
import { fetchExperiences } from "../services/api";

// Define a type for our Experience data
type Experience = {
  _id: string;
  title: string;
  location: string;
  price: number;
  imageUrl: string;
  description: string;
};

// Experience Card Component (no change)
const ExperienceCard: React.FC<{ exp: Experience }> = ({ exp }) => {
  return (
    // Set h-full and flex-col to make all cards equal height
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-all hover:shadow-xl flex flex-col h-full">
      <Link to={`/details/${exp._id}`} className="block flex flex-col h-full">
        {/* Image (fixed height) */}
        <img src={exp.imageUrl} alt={exp.title} className="w-full h-48 object-cover flex-shrink-0" />
        
        {/* Content (This part grows) */}
        <div className="p-4 flex flex-col flex-grow">
          {/* Title, Location, Desc (this part expands) */}
          <div className="flex-grow">
            <div className="flex justify-between items-baseline gap-2 mb-2">
              <h2 className="text-lg font-bold truncate">{exp.title}</h2>
              <span className="flex-shrink-0 bg-brand-gray-dark text-xs font-medium px-2 py-0.5 rounded-full">{exp.location}</span>
            </div>
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{exp.description}</p>
          </div>
          
          {/* Price/Button (This part sticks to the bottom) */}
          <div className="mt-auto pt-2 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <p className="text-lg font-bold">
                <span className="text-sm font-normal">From</span> ₹{exp.price}
              </p>
              <span className="bg-brand-yellow px-4 py-2 rounded-md font-semibold text-sm hover:bg-yellow-400">
                View Details
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

// --- 2. Define the type for the context ---
type HomeContext = {
  searchTerm: string;
};

// --- Home Page ---
const HomePage: React.FC = () => {
  // --- 3. Create two states: one for all data, one for the filtered view ---
  const [allExperiences, setAllExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- 4. Get the searchTerm from App.tsx via the context ---
  const { searchTerm } = useOutletContext<HomeContext>();

  // --- Effect 1: Fetch data ONCE on component mount ---
  useEffect(() => {
    const loadExperiences = async () => {
      try {
        setLoading(true);
        const data = await fetchExperiences();
        setAllExperiences(data);      // <-- Store in the master list
        setFilteredExperiences(data); // <-- Store in the list to be displayed
        setError(null);
      } catch (err) {
        setError("Failed to fetch experiences.");
      } finally {
        setLoading(false);
      }
    };
    loadExperiences();
  }, []); // <-- Empty dependency array means this runs only once

  // --- Effect 2: Run this filter logic *every time* searchTerm changes ---
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredExperiences(allExperiences); // If search is empty, show all
      return;
    }
    
    const lowerCaseSearch = searchTerm.toLowerCase();
    const filtered = allExperiences.filter(exp => 
      exp.title.toLowerCase().includes(lowerCaseSearch) ||
      exp.location.toLowerCase().includes(lowerCaseSearch) // Search by title OR location
    );
    setFilteredExperiences(filtered);

  }, [searchTerm, allExperiences]); // <-- Re-run this logic when search or data changes

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Explore Experiences</h1>
      
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      
      {/* --- 5. Render the *filtered* list and add a "no results" message --- */}
      {!loading && !error && filteredExperiences.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredExperiences.map((exp) => (
            <ExperienceCard key={exp._id} exp={exp} />
          ))}
        </div>
      )}
      
      {/* Show this message if no results are found */}
      {!loading && !error && filteredExperiences.length === 0 && (
         <p className="text-center text-gray-600 text-lg">
          No experiences found for "{searchTerm}".
         </p>
      )}
    </div>
  );
};

export default HomePage;