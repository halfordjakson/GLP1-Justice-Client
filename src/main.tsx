import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import LandingForm from "./components/landingForm";
// import Profile from "./components/profile";
import File from "./components/file";
import About from "./components/about";
import Resources from "./components/resources";
import AboutUs from "./components/aboutus";
import Privacy from "./components/privacy";
import CookiePolicy from "./components/cookiePolicy";
import CookieSettings from "./components/cookieSettings";
import './index.css';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/about", element: <About /> },
  // { path: "/profile", element: <Profile /> },
  { path: "/file", element: <File /> },
  { path: "/resources", element: <Resources /> },
  { path: "/aboutus", element: <AboutUs /> },
  { path: "/landing", element: <LandingForm /> },
  { path: "/privacy", element: <Privacy /> },
  { path: "/cookie-policy", element: <CookiePolicy /> },
  { path: "/cookie-settings", element: <CookieSettings /> },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
