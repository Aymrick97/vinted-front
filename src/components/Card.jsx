import { Link } from "react-router-dom";

const Card = ({ dataCard }) => {
  const { owner, product_image, product_price, product_details } = dataCard;
  return (
    <Link to={`/offres/${dataCard._id}`}>
      <div className="card">
        <div className="proprio">
          {owner.account.avatar && (
            <img id="avatar" src={owner.account.avatar.secure_url} alt="" />
          )}
          <p id="p-gris">{owner.account.username}</p>
        </div>
        <img src={product_image.secure_url} alt="" />
        <p id="price">{product_price} €</p>
        <div>
          {product_details.map((detail, index) => {
            if (detail.TAILLE) {
              return (
                <p id="p-gris" key={index}>
                  {detail.TAILLE}
                </p>
              );
            } else if (detail.MARQUE) {
              return (
                <p id="p-gris" key={index}>
                  {detail.MARQUE}
                </p>
              );
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </Link>
  );
};

export default Card;
