import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import "./index.css";

// Import Pages
import HomePage from "./pages/HomePage.tsx";
import DetailsPage from "./pages/DetailsPage.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
import ResultPage from "./pages/ResultPage.tsx";

// Define the routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <HomePage />, // Home Page [cite: 12]
      },
      {
        path: "/details/:id",
        element: <DetailsPage />, // Details Page [cite: 13]
      },
      {
        path: "/checkout",
        element: <CheckoutPage />, // Checkout Page [cite: 14]
      },
      {
        path: "/result",
        element: <ResultPage />, // Result Page [cite: 15]
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);