import './GuestsSummaryCard.scss';
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Card from '../Card/Card';

function GuestsSummaryCard () {
    const [guestList, setGuestList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const url = import.meta.env.VITE_API_URL;

// get the list of all guests
    const getList = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);

        try {
          const { data } = await axios.get(`${url}/api/guests`);
          console.log(data);
          setGuestList(data);
          setIsLoading(false);
        } catch (error) {
          console.error(`Could not fetch guest list ${error}`);
          setIsError(true);
        }
      }, []);

      useEffect(() => {
        getList();
      }, [getList]);

    
    if(isError) {
        return <h1>Sorry, there was some error in fetching the data</h1>
    }

    if(isLoading) {
        return <h1>Loading data...</h1>
    }

    return (
        <Card title="Total Guests" value={guestList? guestList.length : ''}/>
    );
}

export default GuestsSummaryCard;