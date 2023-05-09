import logo from "../assets/images/logo.png";
import { Link, NavLink, Navigate, useNavigate } from "react-router-dom";

//recuperer tout ce que jai envoyer depuis app.jsx
const Header = ({ token, handleToken, setLookingFor, lookingFor }) => {
  //console.log(token);
  const navigate = useNavigate();
  const handleClick = () => {
    if (handleToken) {
      handleToken(null);
    }
    navigate("/");
  };
  return (
    <div className="container">
      <section className="head">
        <Link to="/">
          <img src={logo} alt="Logo vinted" />
        </Link>
        <input
          id="recherche"
          type="text"
          placeholder="Recherche des articles"
          value={lookingFor}
          onChange={(event) => {
            setLookingFor(event.target.value);
          }}
        />
        <div>
          {token ? (
            <div className="head2">
              <button
                id="deconect"
                /* onClick={() => {
                  if (handleToken) {
                    handleToken(null);
                  }
                }} */
                onClick={handleClick}
              >
                Se deconnecter
              </button>
            </div>
          ) : (
            <div>
              <Link to="/signup">
                <button>S'inscrire</button>
              </Link>
              <Link to="/login">
                <button>Se connecter</button>
              </Link>
            </div>
          )}
        </div>
        <Link to={token ? "/publish" : "/login"}>
          <button id="vente">Vends tes articles</button>
        </Link>
      </section>
    </div>
  );
};

export default Header;
