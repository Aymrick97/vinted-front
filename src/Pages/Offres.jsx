import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Offres = () => {
  const [data, setData] = useState();
  const [chargement, setChargement] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          ` https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
        );
        setData(response.data);
        setChargement(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id]);

  return chargement ? (
    <p>Chargement en cours...</p>
  ) : (
    <div>
      <section className="secOffre">
        <div className="container">
          <div className="offre">
            <div>
              <img src={data.product_image.secure_url} alt="" />
            </div>
            <div className="cardDetail">
              <h3>{data.product_price} €</h3>
              <div>
                {data.product_details.map((elem, index) => {
                  //pour recuperer le nom de clef
                  const keyName = Object.keys(elem)[0];
                  return (
                    <div key={index}>
                      <div className="detail1">
                        <div id="col1">
                          {/* J'affiche le nom dela clef  */}
                          <p>{keyName} </p>
                        </div>

                        <div id="col2">
                          <span>{elem[keyName]}</span>
                        </div>
                        {/* et son contenu */}
                      </div>
                    </div>
                  );
                })}
              </div>
              <hr />
              <div className="detail2">
                <h4>{data.product_name}</h4>
                <span>{data.product_description}</span>
                <div className="dernier">
                  <img src={data.owner.account.avatar.secure_url} alt="" />
                  <p>{data.owner.account.username}</p>
                </div>
              </div>
              <button id="achat">Acheter</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Offres;
