import React, {useState,useEffect} from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header.js";
import Body from "./components/Body";
import About from "./components/About.js";
import Contact from "./components/Contact.js"
import Error from "./components/Error.js";
import RestaurantMenu from "./components/RestaurantMenu.js";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import ThemeContext from "./utils/ThemeContext.js";
import Cart from "./components/Cart.js";
import appStore from "./utils/AppStore.js";
import { Provider } from "react-redux";
import LoginContext from "./utils/LoginContext.js"
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";


const AppLayout = () => {
  const [theme, setTheme] = useState("light");
  const [login, setLogin] = useState(false);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  const changeMode = () => {
    console.log('clicked');
    const image = document.getElementById("mode-img");
    console.log("image" , image.src);
    if(theme == "dark"){
      
      image.src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTeDnv8PruFmHMhxGbjjJ2NUwzarQyxmta0Xw&s ";
    }
    else{
      image.src = "https://png.pngtree.com/png-vector/20220726/ourlarge/pngtree-light-mode-dark-mode-glyph-ui-icon-silhouette-mode-light-vector-png-image_47717214.jpg";
    }
    if(theme == "light"){
      setTheme("dark");
    }
    else{
      setTheme("light");
    } 
  }


  return (
    <Provider store = {appStore}>
      <LoginContext.Provider value = {{login, setLogin}}>
      <ThemeContext.Provider value = {{theme, setTheme}}>
      <div style = {{ height: "100vh"}}>
            <Header />
            <Outlet/>
          </div>
    </ThemeContext.Provider>
      </LoginContext.Provider>

    </Provider>
    
    
  );
};

const appRouter = createBrowserRouter([
  {
   path: "/",
   element: <AppLayout/>,
   errorElement: <Error />,
   children: [
    {
      path: "/",
      element: <Body />
    },
    {
      path: "/about",
      element: <About />
    },
    {
      path: "/contact",
      element: <Contact />
    },
    {
      path: "/restaurants/:restId",
      element: <RestaurantMenu />
    },
    {
      path:"/cart",
      element: <Cart />
    },
    {
      path: "/signup",
      element: <Signup />
    }, 
    {
      path: "/login",
      element: <Login />
    }
   ]
  }
  
 
 ])

const root = ReactDOM.createRoot(document.getElementById("container"));
root.render(< RouterProvider router={appRouter} />);


