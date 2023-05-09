import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ gestionToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  return (
    <div>
      <div className="loguer">
        <h3>Se connecter</h3>
        <form
          className="form2"
          onSubmit={async (event) => {
            event.preventDefault();
            setErrorMessage("");
            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/login",
                {
                  email: email,
                  password: password,
                }
              );
              if (response.data.token) {
                gestionToken(response.data.token);
                navigate("/");
              }
              // console.log(response.data);
            } catch (error) {
              console.log(error.response.data);
            }
          }}
        >
          <input
            type="email"
            placeholder="Adresse email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            value={email}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <button type="submit">Se connecter</button>
        </form>
        <div className="final">
          <span>Vous avez déjà un compte ? </span>
          <Link to="/login">
            <span>Inscrit-toi !</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
