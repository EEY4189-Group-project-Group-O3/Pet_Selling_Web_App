
import './App.css'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import AppRoutes from './AppRoutes'
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/useUserContext';
import { ChakraProvider } from '@chakra-ui/react'

function App() {
  const queryClient = new QueryClient()



  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <UserProvider>


          <BrowserRouter>
            <AppRoutes />

          </BrowserRouter>

          <ReactQueryDevtools />
        </UserProvider>
      </QueryClientProvider>

    </ChakraProvider >

  )
}

export default App
