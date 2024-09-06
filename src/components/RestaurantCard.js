import { CDN_URL } from "../utils/constants";
import React, {useContext} from "react";
import ThemeContext from "../utils/ThemeContext";

const RestaurantCard = ({ res_data }) => {
    const {theme} =      useContext(ThemeContext);
    const {name, avgRating, sla, cloudinaryImageId, cuisines} = res_data.info;

    return (
      <div className="res-card shadow-lg " style = {{backgroundColor: theme == "dark" ? "#EBDCDC": "white"}}>
        <img
          src={CDN_URL+cloudinaryImageId}
          width="100%"
          style = {{objectFit:"cover", aspectRatio: '16 / 9'}}
          
          alt={name}
        />
        <div class = "rest-data"> <b>{name}</b><br></br>
        
        <span style = {{display: 'flex', gap: '10px'}}>
        <img height = "10px" width = "22px" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiZZDDZdrwOTUL--HgKdSA_22ZgBciqwXhPg&s" />
        {" " + avgRating+ "  "}
        <b><li>{sla.deliveryTime + " mins"}</li></b>
        </span>
        <p style = {{color: 'grey', fontSize : '15px'}}>{cuisines.join(", ")}</p>
        </div>
       
      </div>
    );
  };

  export const withPromotedLabel = () => {
    return ({res_data}) => {
      return (
        <div>
          <label className = "p-2 m-2 bg-black text-white rounded-lg">Promoted</label>
          <RestaurantCard res_data = {res_data}/>
        </div>
      )
    }
  }

  export default RestaurantCard;
  