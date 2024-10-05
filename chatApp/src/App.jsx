import { Route, Routes, useNavigate } from "react-router-dom";
import { Login } from "./Pages/LOGIN/Login";
import Chat from "./Pages/CHAT/Chat";
import Validateform from "./Component/VALIDATEDFORM/Validateform";
import ProfileUpdate from "./Pages/PROFILE/ProfileUpdate";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./Config/Firebase";
import { AppContext } from "./context/AppContext";

function App() {
  const navigate = useNavigate();
  const { loadUserData } = useContext(AppContext);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        navigate("/chat");
        await loadUserData(user.uid);
      } else {
        navigate("/");
      }
    });
    //
  }, []);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="chat" element={<Chat />} />
        <Route path="Profile" element={<ProfileUpdate />} />
        <Route path="formValidation" element={<Validateform />} />
        
      </Routes>
    </>
  );
}

export default App;
