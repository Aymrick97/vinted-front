import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Cookies from "js-cookie";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  "pk_live_51JhjboKGwKdskFHCtii1Xxo2OsCWJUuMyxyylDWCflhVTgbtAdP5YYQndKUUL2Gsy3qATvmDkH5yVYFI3dDt76kR004OupTIKq"
);

//importer mes pages pour le router
import Header from "./components/Header";
import Home from "./Pages/Home";
import Offres from "./Pages/Offres";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Publish from "./Pages/Publish";
import Payment from "./Pages/Payment";

function App() {
  // token
  const [token, setToken] = useState(Cookies.get("TokenSite") || null);
  //input de recherche
  const [lookingFor, setLookingFor] = useState("");
  //cookies
  const gestionToken = (token) => {
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
        gestionToken={gestionToken}
        token={token}
        lookingFor={lookingFor}
        setLookingFor={setLookingFor}
      />
      {/*  envoyé token, recherche et son set pour header  */}
      <Routes>
        <Route path="/" element={<Home lookingFor={lookingFor} />} />
        {/*  envoyé lookingFor pour Home  */}
        <Route path="/Offres/:id" element={<Offres />} />
        <Route
          path="/signup"
          element={<SignUp gestionToken={gestionToken} />}
        />
        {/*  envoyé token pour signup  */}
        <Route path="/login" element={<Login gestionToken={gestionToken} />} />
        {/*  envoyé token pour login  */}
        <Route path="/publish" element={<Publish token={token} />}></Route>
        <Route path="/payment" element={<Payment />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
