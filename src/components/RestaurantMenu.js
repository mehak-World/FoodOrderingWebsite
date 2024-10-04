import { Shimmer } from "./Shimmer";
import { useParams } from "react-router-dom";
import useFetchResMenu from "../utils/useFetchResMenu.js";
import ResHeading from "./ResHeading";
import { useState, useContext } from "react";
import RestItems from "./RestItems.js";
import ThemeContext from "../utils/ThemeContext";

const RestaurantMenu = () => {
  const {theme} = useContext(ThemeContext);
  const { restId } = useParams();
  let menu = useFetchResMenu(restId);
  const [isVegOnly, setIsVegOnly] = useState(false); // Track the veg-only filter state
  const [nonVegOnly, setNonVegOnly] = useState(false);

  if (menu === null) {
    return <Shimmer />;
  }
  const { name } = menu?.data?.cards[2]?.card?.card?.info;
  
  return (
    <div className="restContainer">
      <ResHeading
        name={name}
        setNonVegOnly={setNonVegOnly}
        setIsVegOnly={setIsVegOnly} 
      />
      <br />
      <br />
      <RestItems
        menu={menu}
        isVegOnly={isVegOnly}
        nonVegOnly={nonVegOnly}
      />
    </div>
  );
};

export default RestaurantMenu;