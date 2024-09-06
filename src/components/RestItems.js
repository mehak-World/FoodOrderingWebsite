import React, {useContext} from "react";
import ItemList from "./ItemList";


const RestItems = ({ menu, isVegOnly, nonVegOnly }) => {
 
  const categories = menu.data.cards[4].groupedCard.cardGroupMap.REGULAR.cards;

  return (
    <ul style = {{height: "100%"}}>
      {categories.map((cat, index) => {
        const items = cat.card.card.itemCards;
        if (cat.card.card.title && items) {
          return (
            <ItemList
              items={items}
              index={index}
              cat={cat}
              isVegOnly={isVegOnly}
              nonVegOnly={nonVegOnly}
            />
          );
        }
        return null; // Explicitly return null for items that don't match the condition
      })}
    </ul>
  );
};

export default RestItems;