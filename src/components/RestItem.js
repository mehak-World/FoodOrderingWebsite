import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addToCart , removeFromCart, changeQuantity} from "../utils/cartSlice";
import { useState , useContext} from "react";
import { useSelector } from "react-redux";
import LoginContext from "../utils/LoginContext";

const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };




const RestItem = ({item, cart = false, quantity}) => {
  
  
  const login = useSelector((store) => store.user.loginStatus);
  const userId = useSelector((store) => store.user.currentUserId);
  console.log(login);
  const [inputValue, setInputValue] = useState(quantity);
  const dispatch = useDispatch();
  const [description, setDescription] = useState(truncateText(item?.card?.info?.description || '', 100));
  const [btnValue, setBtnValue] = useState("....More")

  const expandDescription = (e) => {
    if(btnValue == "....More"){
      setDescription(item.card.info.description);
      setBtnValue("...Less")
    }
    else{
      setDescription(truncateText(item.card.info.description, 100));
      setBtnValue("....More")
    }
    
  }


  const handleAddItem = (item) => {
        dispatch(addToCart({userId, item}));
  }


  const handleQuantityChange = (item) => { 
    dispatch(changeQuantity({userId, id: item.card.info.id, newQuantity: inputValue}))
  }



  const handleRemoveItem = (item) => {
    console.log(item.card.info.id);
    const itemId = item.card.info.id
    dispatch(removeFromCart({userId, itemId}));
  }

  return (
        <>
        <div key={item.card.infoid} className="itemContainer">
                <div className="item-desc">
                  <p>
                    {item.card.info.itemAttribute.vegClassifier === "VEG" ? (
                      <img
                        height="20px"
                        width="20px"
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Veg_symbol.svg/1024px-Veg_symbol.svg.png"
                        alt="Veg"
                      />
                    ) : (
                      <img
                        height="20px"
                        width="20px"
                        src="https://cdn.vectorstock.com/i/500p/00/43/non-vegetarian-sign-veg-logo-symbol-vector-50890043.jpg"
                        alt="Non-Veg"
                      />
                    )}
                  </p>
                  <p>{item.card.info.name}</p>
                  <p>
                    ₹
                    {item.card.info.price / 100 ||
                      item.card.info.defaultPrice / 100}
                  </p>
                  <p style = {{display: "flex", gap: "5px"}}>
                    <img
                      height="20px"
                      width="20px"
                      src="https://thumbs.dreamstime.com/b/yellow-star-icon-rating-vector-eps-143537451.jpg"
                      alt="Rating"
                    />
                    {item.card.info.ratings.aggregatedRating.rating
                      ? `${item.card.info.ratings.aggregatedRating.rating} (${item.card.info.ratings.aggregatedRating.ratingCountV2})`
                      : "No rating available"}
                  </p>
                  <p className="text">
                    {item.card.info.description
                      ? description
                      : ""}
                      {description?.length > 100 ? <button onClick = {expandDescription}>{btnValue}</button> : ''}
                  </p>
                </div>
                <div>
                  {item.card.info.imageId ? (
                    <div>
                    <img
                      src={CDN_URL + item.card.info.imageId}
                      width="150px"
                      style={{
                        objectFit: "cover",
                        aspectRatio: "16 / 10",
                      }}
                      alt="Item"
                    />
                  </div>
                  ) : (
                   ""
                  )}
                </div>
                <div className = "relative ml-3 p-4">
                  {cart == false && login &&
                    <button className = "bg-blue-500 text-white absolute left-12 p-2 rounded-lg w-36" onClick = {() => handleAddItem(item)}>Add + </button>}
                    {cart == true &&
                    <button className = "bg-red-500 text-white left-10 p-2 rounded-lg w-36 mb-3" onClick = {() => handleRemoveItem(item)}>Remove Item </button>}
                    { cart == true && (

                     <div>
                       <label for = "quantity">Quantity: </label>
                        <input type = "number" value = {inputValue} className ="text-black rounded-md p-2 " onChange = {(e) => setInputValue(e.target.value)}/>
                        <br />
                        <br />
                        <button type = "submit" className = "bg-yellow-600 rounded-lg p-2" onClick = {() => handleQuantityChange(item)}>Change quantity</button>
                      </div>
                       
                      
                    )
                      
                      
                      }
                    </div>
        </div>
        <hr />
        <br />
        <br />
        </>

    )
    
             
}

export default RestItem;