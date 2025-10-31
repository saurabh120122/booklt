import { Link, Outlet } from "react-router-dom";
import { useState } from "react"; // <-- 1. Import useState

const Logo = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 0C17.0271 0 14.0831 0.730335 11.4349 2.12693C8.78673 3.52353 6.50026 5.5471 4.77259 7.99951C3.04492 10.4519 1.93655 13.2588 1.54516 16.1959C1.15377 19.133 1.49137 22.1354 2.53125 24.9375C3.78125 28.25 5.625 30.625 8.75 32.5C10.5113 33.562 12.4336 34.3394 14.4531 34.8016C16.4726 35.2637 18.5615 35.4042 20.625 35.2188C24.3125 34.875 27.5625 33.3125 30.75 30.75C33.3125 28.5625 35.5 25.375 36.5625 22.0625C37.8125 18.125 37.9375 13.875 36.75 10C35.4062 5.5 32.0938 2.03125 27.625 0.75C25.2988 0.183748 22.6487 -0.0901052 20 0ZM20.125 10C21.75 10 23.25 10.625 24.375 11.75C25.5 12.875 26.125 14.375 26.125 16C26.125 17.625 25.5 19.125 24.375 20.25C23.25 21.375 21.75 22 20.125 22C18.5 22 17 21.375 15.875 20.25C14.75 19.125 14.125 17.625 14.125 16C14.125 14.375 14.75 12.875 15.875 11.75C17 10.625 18.5 10 20.125 10Z" fill="black"/>
    <path d="M20.125 10C18.5 10 17 10.625 15.875 11.75C14.75 12.875 14.125 14.375 14.125 16C14.125 17.625 14.75 19.125 15.875 20.25C17 21.375 18.5 22 20.125 22C21.75 22 23.25 21.375 24.375 20.25C25.5 19.125 26.125 17.625 26.125 16C26.125 14.375 25.5 12.875 24.375 11.75C17 10.625 18.5 10 20.125 10Z" fill="white"/>
  </svg>
);

const Header = ({ searchTerm, onSearchChange }: { searchTerm: string, onSearchChange: (value: string) => void }) => (
  <header className="bg-white sticky top-0 z-10 shadow-sm">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <Link to="/" className="flex items-center gap-2">
        <Logo />
        <span className="font-bold text-xl">highway delite</span>
      </Link>
      <div className="flex items-center w-full max-w-md">
        <input 
          type="text" 
          placeholder="Search by title or location..." 
          value={searchTerm} 
          onChange={(e) => onSearchChange(e.target.value)} 
          className="w-full px-4 py-2 border border-brand-gray-dark rounded-l-md focus:outline-none focus:ring-2 focus:ring-brand-yellow"
        />
        <button className="bg-brand-yellow px-6 py-2 rounded-r-md font-semibold hover:bg-yellow-400">
          Search
        </button>
      </div>
    </div>
  </header>
);

function App() {
  
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="min-h-screen bg-brand-gray-light">
      {}
      <Header 
        searchTerm={searchTerm} 
        onSearchChange={setSearchTerm} 
      />
      <main>
        {}
        <Outlet context={{ searchTerm }} />
      </main>
    </div>
  );
}

export default App;