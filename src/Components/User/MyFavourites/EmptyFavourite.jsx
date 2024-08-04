import React from "react";
import empty from "../../../Assets/imges/EmptyWishlist.png";
import { Link } from "react-router-dom";
export default function EmptyFavourite() {
  return (
    <div className="empty-wish-cont">
      <div className="favourite-empty-img-cont">
        <img src={empty} alt="empty-wish" />
        <div className="wish-empty-text">
          <p>Ther is no Favourites</p>
          <Link to="/alltest">
            <button className="btn go-test">Add Favourites</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
