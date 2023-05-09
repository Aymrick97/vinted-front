import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = ({ userToken }) => {
  const [nom, setnom] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  return (
    <div>
      <div className="enregistrer">
        <h3>S'inscrire</h3>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            setErrorMessage("");
            try {
              const response = await axios.post(
                "https://lereacteur-vinted-api.herokuapp.com/user/signup",
                {
                  email: email,
                  username: nom,
                  password: password,
                  newsletter: newsletter,
                }
              );

              if (response.data.token) {
                userToken(response.data.token);
                navigate("/");
              }
            } catch (error) {
              if (error.response.status === 409) {
                setErrorMessage(
                  "Email dejà existant, veuillez choisir un autre email merci ! 🙂)"
                );
              } else if (error.response.data.message === "Missing parameters") {
                setErrorMessage("Veuillez remplir tous les champs ! 🤓");
              }
            }
          }}
        >
          <input
            type="text"
            placeholder="Nom d'utilisateur"
            onChange={(event) => {
              setnom(event.target.value);
            }}
            value={nom}
          />
          <input
            type="email"
            placeholder="Email"
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
          <div>
            <input
              id="newsletter"
              type="checkbox"
              onChange={() => {
                setNewsletter(!newsletter);
              }}
              checked={newsletter}
            />
            <label htmlFor="newsletter">S'inscrire à notre newsletter</label>

            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes &
              Conditions et Politique de Confidentialité de Vinted. Je confirme
              avoir au moins 18 ans.
            </p>
          </div>
          <button type="submit">S'inscrire</button>
        </form>

        {errorMessage && <p>{errorMessage}</p>}
        <div className="final">
          <span>Vous avez déjà un compte ? </span>
          <Link to="/login">
            <span>Connecte-toi !</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
