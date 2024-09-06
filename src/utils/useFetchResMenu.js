import {useState, useEffect} from "react";

const useFetchResMenu = (restId) => {
    const [menu, setMenu] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch(
            `https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=30.6425496&lng=76.8173359&restaurantId=${restId}`
          );
          const data = await response.json();
          setMenu(data);
        } catch (error) {
          console.error("Error fetching menu data:", error);
        }
      };
    
      fetchData();
    }, [restId]);

    return menu;
}

export default useFetchResMenu;