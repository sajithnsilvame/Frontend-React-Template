import { AuthProvider } from "./Contexts/AuthContext"
import AppRouter from "./Routes/Router"



function App() {
  

  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  
  )
}

export default App
