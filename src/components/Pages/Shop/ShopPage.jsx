import React from "react";
import "./ShopPage.min.css";
import { appCard } from "../../../util/mui/MUIUtils";

const Shop = () => {
  return (
    <div className="p-3 d-flex flex-column" data-aos="fade">
      <div className="row">
        <div className={`${appCard}`}>
          <h2 className="card-title">Shop</h2>
        </div>
      </div>
    </div>
  );
};

export default Shop;
