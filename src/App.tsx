import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./Contexts/AuthContext"
import AppRouter from "./Routes/Router"



function App() {
  

  return (
    <AuthProvider>
      <AppRouter />
      <Toaster position="top-center" />
    </AuthProvider>
  
  )
}

export default App
