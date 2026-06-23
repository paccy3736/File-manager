import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { FilesProvider } from './context/FilesContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <FilesProvider>
      <App />
    </FilesProvider>
  </StrictMode>,
)
