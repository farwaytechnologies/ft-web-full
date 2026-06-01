import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { StudentProvider } from './context/StudentContext.jsx'
import Clarity from '@microsoft/clarity';

// Make sure to add your actual project id instead of "yourProjectId".
const projectId = "x09r8zct44"

Clarity.init(projectId);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StudentProvider>
      <App />
    </StudentProvider>
  </StrictMode>,
)
