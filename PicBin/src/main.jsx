import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import  UserContex  from './context/UserContex.jsx'
 
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContex>

    <BrowserRouter>
    <App />
  </BrowserRouter >
    </UserContex>
  </StrictMode>
)
