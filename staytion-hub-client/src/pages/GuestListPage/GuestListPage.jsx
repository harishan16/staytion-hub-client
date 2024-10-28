// import Layout from "../../components/Layout/Layout";
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

    
    return (
        <GuestList data={ guestList } />
    );
}

export default GuestListPage;