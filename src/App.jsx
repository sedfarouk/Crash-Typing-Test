import './App.css'
import { ThemeProvider } from './components/theme-provider'
import HomePage from './pages/HomePage'
import AppContextProvider from './store/app-store'

function App() {
  return (
    <AppContextProvider>
      <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
        <HomePage />
      </ThemeProvider>
    </AppContextProvider>
  )
}

export default App
