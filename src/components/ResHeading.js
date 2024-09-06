import React, { useState, useEffect, useContext } from "react";
import { CDN_URL } from "../utils/constants";
import useFetchResData from "../utils/useFetchResData";
import { Shimmer } from "./Shimmer";
import ThemeContext from "../utils/ThemeContext";

const ResHeading = ({ name, setIsVegOnly, setNonVegOnly }) => {
  const { theme } = useContext(ThemeContext);
  const { initialData } = useFetchResData();

  const [rest_objs, setRest_objs] = useState([]);

  useEffect(() => {
    const result = initialData.filter((res) => res.info.name === name);
    setRest_objs(result);
  }, [name, initialData]); // Add dependencies here

  const handleChange = (event) => {
    if (event.target.classList.contains("veg")) {
      setIsVegOnly(event.target.checked);
      setNonVegOnly(false);
      document.querySelector(".nonVeg").checked = false;
    } else {
      setNonVegOnly(event.target.checked);
      setIsVegOnly(false);
      document.querySelector(".veg").checked = false;
    }
  };

  if (rest_objs.length === 0) {
    return <Shimmer />;
  }

  return (
    <>
      <h2 className="restHeading font-bold text-2xl pb-2" style={{ color: theme === "dark" ? "white" : "black" }}>
        {name}
      </h2>
      <div className="rest_card" style={{ color: theme === "dark" ? "white" : "black", display: "flex" }}>
        <div>
          <img
            src={rest_objs[0]?.info?.cloudinaryImageId ? CDN_URL + rest_objs[0].info.cloudinaryImageId : ""}
            style={{ aspectRatio: "16/11", width: "40%" }}
            alt="Restaurant"
          />
        </div>
        <div>
          <div style={{ display: "flex", gap: "10px", fontSize: "16px", fontWeight: "bold" }}>
            <div className="mb-3">
              <img
                className="w-7 h-1/2"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/Flag_of_Stellaland.svg/640px-Flag_of_Stellaland.svg.png"
                alt="Rating Flag"
              />
              {rest_objs[0]?.info?.avgRating || ""}
              {rest_objs[0]?.info?.totalRatingsString ? ` (${rest_objs[0].info.totalRatingsString} ratings)` : ""}
            </div>
          </div>

          <p style={{ color: theme === "dark" ? "white" : "#ff6600", textDecoration: "underline" }}>
            {rest_objs[0]?.info?.cuisines.join(", ") || ""}
          </p>
          <br />
          <p style={{ color: theme === "dark" ? "white" : "green", fontWeight: "bold", marginTop: "-10px" }}>
            {rest_objs[0]?.info?.sla?.deliveryTime ? `Delivery in ${rest_objs[0].info.sla.deliveryTime} mins` : ""}
          </p>
        </div>
      </div>
      <div style={{ marginTop: "20px", display: "flex", gap: "10px", color: theme === "dark" ? "white" : "black" }}>
        <label>Veg Only</label>
        <input className="veg" type="checkbox" onChange={handleChange} />
        <br />
        <label>Non Veg Only</label>
        <input className="nonVeg" type="checkbox" onChange={handleChange} />
      </div>
    </>
  );
};

export default ResHeading;
