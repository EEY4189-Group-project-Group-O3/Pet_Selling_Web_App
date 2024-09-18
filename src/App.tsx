
import './App.css'
import AppRoutes from './AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { ClerkProvider } from '@clerk/clerk-react'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
function App() {

  return (
    <ChakraProvider>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
        <BrowserRouter>
          <AppRoutes />

        </BrowserRouter>
      </ClerkProvider>
    </ChakraProvider >

  )
}

export default App
