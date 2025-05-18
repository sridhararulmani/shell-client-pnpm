import "./ShopPage.min.css";
import { appCard } from "../../../util/mui/MUIUtils";
import { appContainerStyle, dataAosAnimationForContainers, dataAosOnce } from "../../../util/AppUtils";

const Shop = () => {
  return (
    <div className={`d-flex flex-column ${appContainerStyle}`} data-aos={dataAosAnimationForContainers} data-aos-once={dataAosOnce}>
      <div className="row">
        <div className={`${appCard}`}>
          <h2 className="card-title">Shop</h2>
        </div>
      </div>
    </div>
  );
};

export default Shop;
