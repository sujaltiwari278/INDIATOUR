import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import "leaflet/dist/leaflet.css";

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <App />
  <Toaster position="top-right" />
</BrowserRouter>
)
