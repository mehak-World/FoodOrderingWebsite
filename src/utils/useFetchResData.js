import { useEffect, useState } from "react";
import { REST_URL } from "./constants";

const useFetchResData = () => {
    const [initialData, setInitialData] = useState([]);
    const [rest_objs, setRest_objs] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(REST_URL);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const json = await response.json();
                console.log(json);
                const res_data = json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants;
                console.log(res_data);
                setRest_objs(res_data || []);
                setInitialData(res_data || []);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };
        fetchData();
    }, []); // Empty dependency array means this runs only once on mount

    return { initialData, rest_objs, setRest_objs };
};

export default useFetchResData;
