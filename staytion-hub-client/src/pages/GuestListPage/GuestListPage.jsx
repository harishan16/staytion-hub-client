import GuestList from "../../components/GuestList/GuestList"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function GuestListPage () {

        const [guestList, setGuestList] = useState([]);
        const [isError, setIsError] = useState(false);
        const [isLoading, setIsLoading] = useState(true);
        const url = import.meta.env.VITE_API_URL;

        // get the list of all guest names
        const getGuestList = useCallback(async () => {
            setIsLoading(true);
            setIsError(false);
  
        try {
            const { data } = await axios.get(`${url}/api/guests`);
            setGuestList(data);
            setIsLoading(false);

        } catch (error) {
            console.error(`Could not fetch guest list ${error}`);
        }
        }, []);
      
        useEffect(() => {
            getGuestList();
        }, [getGuestList]);

    if(isError) {
        return <h1>Sorry, there was some error in fetching the data</h1>
    }
    
    if(isLoading) {
        return <h1>Loading data...</h1>
    }

    return (
        <GuestList data={ guestList } />
    );
}

export default GuestListPage;