import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/register/Signup";
import Home from "./components/home/Home";
import { AuthProvider } from "./contexts/authContext";
import Header from "./components/header/Header";

function App() {

  return (
    <>
    <BrowserRouter>
     <AuthProvider>
      <Header />
       <Routes>
         <Route path="*" element={<Login />} />
         <Route path="/login" element={<Login />} />
         <Route path="/signup" element={<Signup />} />
         <Route path="/home" element={<Home />} />
       </Routes>
     </AuthProvider>
    </BrowserRouter>
    </>
  )

}

export default App;
