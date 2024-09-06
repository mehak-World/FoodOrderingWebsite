import React, {useContext} from 'react'
import { useSelector } from 'react-redux'
import RestItem from './RestItem';
import { useDispatch } from 'react-redux';
import { clearCart } from '../utils/cartSlice';
import ThemeContext from "../utils/ThemeContext";
import { Link } from 'react-router-dom';
import LoginContext from '../utils/LoginContext';

const Cart = () => {
    const {theme} = useContext(ThemeContext);
    const login = useSelector((store) => store.user.loginStatus)
    const userId = useSelector((store) => store.user.currentUserId)
    const cartData = useSelector((store) => {
      const userCart = store.cart.userCarts[userId];
      return userCart ? userCart.items : [];
  });
    const quantities = useSelector((store) => {
      const userCart = store.cart.userCarts[userId];
      return userCart ? userCart.quantities : [];
  });
    let val = true;
    let index = 0;
    const dispatch = useDispatch();

    const handleClearCart = () => {
          dispatch(clearCart({userId}))
    }

    const calculatePrice = () => {
      let tot_price = 0;
      for(let i = 0; i < cartData.length; i++){
        if(cartData[i].card.info.price)
          tot_price += cartData[i].card.info.price*quantities[i]/100;
        else
          tot_price += cartData[i].card.info.defaultPrice*quantities[i]/100;
      }

      return tot_price;

    }


  return (
    login ? (
      <div className = "w-1/2 m-auto text-white" style = {{color: theme == "dark"? 'white': 'black'}}>
    {calculatePrice() != 0 &&  <button className = "bg-black p-2 text-white mb-4 rounded" onClick = {handleClearCart}>Clear Cart</button>}
      
    {
      cartData.map((i) => quantities[cartData.indexOf(i)] != 0 && <div>
        <p className = "hidden">{index = cartData.indexOf(i)}</p>
        <RestItem item = {i} cart = {val} quantity = {quantities[index]}/>
        </div>)
    }
    {calculatePrice() != 0 && <h3 className = "font-bold text-2xl mb-3">Total Price: <span className = "text-red-600">
      ₹  {calculatePrice()}</span></h3> }
    

    {calculatePrice() == 0 && <h4 className = "font-bold text-xl">There are no Items in the Cart. <Link to = "/"><span className = "italic text-red-500 font-bold"> Add some items</span></Link></h4>}
  </div>
  
) : <h1  className = "text-center font-bold text-2xl" style = {{color: theme == "dark" ? "white": "black" }}>Please <span className = "text-red-500 font-bold italic">Login</span> to view Cart</h1> 


  )
}

export default Cart
