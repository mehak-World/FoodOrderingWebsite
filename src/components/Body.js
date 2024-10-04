import RestaurantCard, {withPromotedLabel} from "./RestaurantCard";
import {useState, useContext} from "react";
import {Shimmer} from "./Shimmer";
import {Link} from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import ThemeContext from "../utils/ThemeContext";
import useFetchResData from "../utils/useFetchResData";

const Body = () => {
  const { theme } = useContext(ThemeContext);
  console.log("theme", theme);
  let {initialData, rest_objs, setRest_objs} = useFetchResData();
  const onlineStatus = useOnlineStatus();
  console.log(initialData);
 
  const [searchText, setSearchText] = useState('');
  const input = document.getElementById("search_input");

  const RestauarantPromoted = withPromotedLabel();

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  }

  const handleSearch = () => {
    console.log("button clicked");
    const result = initialData.filter((res) => {
      return (res.info.name.toLowerCase()).includes(searchText.toLowerCase());  
    });
    setRest_objs(result);
    setSearchText("");
  }

  if(onlineStatus == false){
      return (
        <h2>
          You are offline. Please check your internet connection
        </h2>
      )
  }

    return (
      <div>
        <div className = "flex ml-20 w-full items-center">
    <br />
        <div className="filter mt-2">
          <button id = "filter_btn" onClick = {() => {
              rest_objs = initialData.filter((res) => res.info.avgRating > 4.3);
             const result = setRest_objs(rest_objs);
             console.log(result);
          }}>
          Top Rated Restaurants</button>
        </div>
        <div className = "search w-3/4 flex h-2/5 ">
          <input type = "text" width = "70%" id = "search_input" value = {searchText} onChange = {handleInputChange}/>
          <button className = "bg-orange-300 p-1.5" onClick = {handleSearch}>Search</button>
        </div>
        </div>
        
        <div className="restaurantContainer ">
          {rest_objs?.length === 0 ? (
        <Shimmer />
      ) : rest_objs.map((res) => (
            <div className = "restaurants mt-10">
             {console.log(res)}
             <Link to= {`/restaurants/${res.info.id}` } style = {{textDecoration: 'none'}}>
             {res.info && res.info.avgRating > 4.4 ? (<RestauarantPromoted res_data = {res}/>): (<RestaurantCard key={res.info.id} res_data={res} />)}
             
             </Link>
            </div>
          ))}
        </div>
      </div>
    );
  };

export default Body; 