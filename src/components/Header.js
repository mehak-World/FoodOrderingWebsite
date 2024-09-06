import React, {useContext} from "react";
import {Link} from "react-router-dom";
import ThemeContext from "../utils/ThemeContext";
import { useSelector } from "react-redux";
import LoginContext from "../utils/LoginContext";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../utils/UserSlice";


const Header = () => {
  const loginStatus = useSelector((store) => store.user.loginStatus)
  const userId = useSelector((store) => store.user.currentUserId)
  const quantities = useSelector((store) => {
    const userCart = store.cart.userCarts[userId];
    return userCart ? userCart.quantities : [];
});
  const dispatch = useDispatch();

  const calTotal = () => {
    let sum = 0;
    for(let i = 0; i < quantities.length; i++){
      sum += parseInt(quantities[i]);
    }
    return sum;
  }

  const handleClick = () => {
      dispatch(logoutUser());
  }
  


  const {theme, setTheme} = useContext(ThemeContext);
  
  const toggleMode = (event) => {
    const image = event.target;
    if(theme == "dark"){
      
      image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeDnv8PruFmHMhxGbjjJ2NUwzarQyxmta0Xw&s ";
    }
    else{
      image.src = "https://png.pngtree.com/png-vector/20220726/ourlarge/pngtree-light-mode-dark-mode-glyph-ui-icon-silhouette-mode-light-vector-png-image_47717214.jpg";
    }
      if(theme == "dark"){
        setTheme("light");
      }

      else{
        setTheme("dark");
      }
  }

    return (

      <div className="header">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYpI2zXD2ONTvyN4jIY3r-eqgtX-cDFucMJw&s"
          height="80px"
          width="80px"
          alt="logo"
        />
        <div className="nav-links" >
          <Link style = {{color: theme == "dark"? "white": "black"}} to="/">Home</Link>
          <Link style = {{color: theme == "dark"? "white": "black"}} to="/about">About Us</Link>
          <Link style = {{color: theme == "dark"? "white": "black"}} to="/contact">Contact Us</Link>
          <Link style = {{color: theme == "dark"? "white": "black"}} to="/cart" className = "font-bold">Cart ({calTotal()} items)</Link>
          {loginStatus == false &&  <button className = "p-2 font-bold rounded-lg bg-yellow-600"><Link to = "/signup">Signup </Link></button>  }
         
         {loginStatus == false && 
         <button className = "p-2 font-bold rounded-lg bg-yellow-600" ><Link to  = "/login">Login</Link></button>}

        {loginStatus == true && 
         <button className = "p-2 font-bold rounded-lg bg-yellow-600" onClick = {handleClick}>Logout</button>}


        
        <button onClick = {toggleMode}>
          <img  width = "40px" height = "40px" id = "mode-img" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeDnv8PruFmHMhxGbjjJ2NUwzarQyxmta0Xw&s " ></img>
        </button>
        </div>
      </div>
    );
  };

  

  export default Header;