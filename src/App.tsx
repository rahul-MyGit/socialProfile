import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./components/auth/login/Login";
import Signup from "./components/auth/register/Signup";
import Home from "./components/home/Home";
import { AuthProvider } from "./contexts/authContext";
import Header from "./components/header/Header";
import Upload from "./components/Upload/Upload";
import ViewImage from "./ViewImage/ViewImage";

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
         <Route path="/dashboard" element={<Upload />} />
         <Route path="view/:id" element={<ViewImage />}/>
       </Routes>
     </AuthProvider>
    </BrowserRouter>
    </>
  )

}

export default App;
