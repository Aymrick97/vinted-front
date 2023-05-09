import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import InputAjouter from "../components/InputAjouter";

const Publish = ({ token }) => {
  // State qui contient mon image sélectionnée
  const [image, setImage] = useState();
  const [titre, setTitre] = useState("");
  const [description, setDescription] = useState("");
  const [prix, setPrix] = useState(0);
  const [lieu, setLieu] = useState("");
  const [marque, setMarque] = useState("");
  const [taille, setTaille] = useState("");
  const [couleur, setCouleur] = useState("");
  const [etat, setEtat] = useState("");

  // State qui contient l'url fourni par cloudinary

  const gestion = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();

      formData.append("title", titre);
      formData.append("description", description);
      formData.append("price", prix);
      formData.append("condition", etat);
      formData.append("city", lieu);
      formData.append("brand", marque);
      formData.append("size", taille);
      formData.append("color", couleur);
      formData.append("picture", image);

      const response = await axios.post(
        " https://lereacteur-vinted-api.herokuapp.com/offer/publish",
        formData,
        {
          headers: {
            authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
    } catch (error) {
      console.log(error.message);
    }
  };
  return token ? (
    <div className="vert">
      <form id="form0" onSubmit={gestion}>
        <h3>Vends ton article</h3>
        <div id="num0">
          <label htmlFor="filePicker">Choisis une image</label>
          <input
            style={{ display: "none" }}
            id="filePicker"
            type="file"
            onChange={(event) => {
              setImage(event.target.files[0]);
            }}
          />
          {image && <img id="apercu" src={URL.createObjectURL(image)} alt="" />}
        </div>

        <div id="num1">
          <InputAjouter
            placeholder="ex: Chemise Sézane verte"
            label="Titre"
            id="title"
            type="text"
            state={titre}
            setState={setTitre}
          />

          <InputAjouter
            placeholder="ex: porté quelquefois ,taille correctement"
            label="Décris ton article"
            id="description"
            state={description}
            setState={setDescription}
            textArea
          />
        </div>
        <div id="num2">
          <InputAjouter
            placeholder="ex: Zara"
            label="Marque"
            id="brand"
            type="text"
            state={marque}
            setState={setMarque}
          />
          <InputAjouter
            placeholder="ex: L / 40 /12 ans"
            label="Taille"
            id="size"
            type="text"
            state={taille}
            setState={setTaille}
          />
          <InputAjouter
            placeholder="ex: Fushia"
            label="Couleur"
            id="color"
            type="text"
            state={couleur}
            setState={setCouleur}
          />
          <InputAjouter
            placeholder="ex: Neuf avec étiquette"
            label="État"
            id="condition"
            type="text"
            state={etat}
            setState={setEtat}
          />
          <InputAjouter
            placeholder="ex: Paris"
            label="Lieu"
            id="place"
            type="text"
            state={lieu}
            setState={setLieu}
          />
        </div>
        <div id="num3">
          <InputAjouter
            placeholder="0,00"
            label="Prix"
            id="price"
            type="number"
            state={prix}
            setState={setPrix}
          />
        </div>
        <div id="btnAchat">
          <div>A</div>
          <button id="ajout" type="submit">
            Ajouter
          </button>
        </div>
      </form>
    </div>
  ) : (
    <Navigate to="/login" />
  );
};

export default Publish;
