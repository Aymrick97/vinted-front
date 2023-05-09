import { useEffect, useState } from "react";
import axios from "axios";
import Card from "../components/Card";
import Hero from "../components/Hero";

const Home = ({ lookingFor }) => {
  const [data, setData] = useState({});
  const [chargement, setChargement] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          " https://lereacteur-vinted-api.herokuapp.com/offers"
        );
        setData(response.data);
        setChargement(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [lookingFor]);

  return chargement ? (
    <p>Chargement en cours...</p>
  ) : (
    <div>
      <Hero />
      <div className="container">
        {data.offers.map((elem, _id) => {
          return <Card key={elem._id} dataCard={elem} />;
        })}
      </div>
    </div>
  );
};

export default Home;
