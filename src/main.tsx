import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import LandingForm from "./components/landingForm";
import Profile from "./components/profile";
import File from "./components/file";
import About from "./components/about";
import Services from "./components/services";
import Resources from "./components/resources";
import Sandbox from "./components/sandbox";
import './index.css';
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
const router = createBrowserRouter([
  { path: "/", element: <LandingForm /> },
  { path: "/home", element: <App /> },
  { path: "/about", element: <About /> },
  { path: "/profile", element: <Profile /> },
  { path: "/file", element: <File /> },
  { path: "/services", element: <Services /> },
  { path: "/resources", element: <Resources /> },
  { path: "/sandbox", element: <Sandbox /> }
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
