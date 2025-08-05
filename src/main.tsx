import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from "./App"
import { pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = 
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
createRoot(document.getElementById('root')!).render(
  <StrictMode>
  <App/> 
  </StrictMode>,
)
