import './App.css'
import { ThemeProvider } from './components/theme-provider'
import HomePage from './pages/HomePage'
import AppContextProvider from './store/app-store'
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <AppContextProvider>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <HomePage />
          <Analytics />
      </ThemeProvider>
    </AppContextProvider>
  )
}

export default App
