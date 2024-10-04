import React, {useContext} from "react";
import RestItem from "./RestItem";
import ThemeContext from "../utils/ThemeContext";

const toggleItems = (index) => {
  
  const allItems = document.querySelectorAll(".items");
  const itemsContainer = document.getElementById(`items-${index}`);
  const icon = document.getElementById(`icon-${index}`);
  console.log(icon);
  const icons = document.querySelectorAll(".fa-caret-up");
  console.log(icons);

  for(let i = 0; i < allItems.length; i++){
    if(allItems[i].id !=  `items-${index}`)
      allItems[i].style.display = "none";
  }

  for(let i =0; i < icons.length; i++){
    if(icons[i].id != icon.id){
      icons[i].classList.remove("fa-caret-up");
      icons[i].classList.add("fa-caret-down");
    }
  }
    itemsContainer.style.display =
    itemsContainer.style.display === "none" ? "block" : "none";

    
    if (icon.classList.contains("fa-caret-down")) {
      icon.classList.remove("fa-caret-down");
      icon.classList.add("fa-caret-up");
    } else {
      icon.classList.remove("fa-caret-up");
      icon.classList.add("fa-caret-down");
    }
 
};


const ItemList = ({ cat, index, items, isVegOnly, nonVegOnly}) => {
  const {theme} = useContext(ThemeContext);

  return (
    <li key={cat.card.card.title}>
      <div className = " shadow-lg pt-2 px-2 mb-2 rounded-sm" style = {{backgroundColor: theme == "dark" ? "#3a3939":'white', color: theme == "dark" ? "white": "black"}}>
      <div className="catContainer cursor-pointer" onClick={() => toggleItems(index)}>
        <p>{`${cat.card.card.title} (${items.length})`}</p>
        <button className="catBtn">
          <i className="fa-solid fa-caret-down" id={`icon-${index}`}></i>
        </button>
      </div>
      <div id={`items-${index}`} style={{ display: "none" }} className="items">
        {items
          .filter(
            (item) =>
              (!isVegOnly && !nonVegOnly) ||
              (isVegOnly &&
                item.card.info.itemAttribute.vegClassifier === "VEG") ||
              (nonVegOnly &&
                item.card.info.itemAttribute.vegClassifier === "NONVEG")
          )
          .map((item) => (
            <>
              <RestItem item = {item} />
            </>
          ))}
         
      </div>
      </div>
      
      
    </li>
    
  );
};

export default ItemList;