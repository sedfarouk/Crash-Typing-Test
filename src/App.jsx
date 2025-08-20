import './App.css'
import { ThemeProvider } from './components/theme-provider'
import HomePage from './pages/HomePage'
import AppContextProvider from './store/app-store'
import { Analytics } from "@vercel/analytics/next"

function App() {
  return (
    <Analytics>
      <AppContextProvider>
        <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
          <HomePage />
        </ThemeProvider>
      </AppContextProvider>
    </Analytics>
  )
}

export default App
