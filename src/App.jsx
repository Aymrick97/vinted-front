import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Cookies from "js-cookie";

//importer mes pages pour le router
import Header from "./components/Header";
import Home from "./Pages/Home";
import Offres from "./Pages/Offres";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Publish from "./Pages/Publish";

function App() {
  // token
  const [token, setToken] = useState(Cookies.get("TokenSite") || null);
  //input de recherche
  const [lookingFor, setLookingFor] = useState("");
  //cookies
  const handleToken = (token) => {
    if (token) {
      setToken(token);
      Cookies.set("TokenSite", token, { expires: 7 });
    } else {
      setToken(null);
      Cookies.remove("TokenSite");
    }
  };
  return (
    <Router>
      <Header
        handleToken={handleToken}
        token={token}
        lookingFor={lookingFor}
        setLookingFor={setLookingFor}
      />
      {/*  envoyé token, recherche et son set pour header  */}
      <Routes>
        <Route path="/" element={<Home lookingFor={lookingFor} />} />
        {/*  envoyé lookingFor pour Home  */}
        <Route path="/Offres/:id" element={<Offres />} />
        <Route path="/signup" element={<SignUp handleToken={handleToken} />} />
        {/*  envoyé token pour signup  */}
        <Route path="/login" element={<Login handleToken={handleToken} />} />
        {/*  envoyé token pour login  */}
        <Route path="/publish" element={<Publish token={token} />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
