import './ReservationsSummaryCard.scss';
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import Card from '../Card/Card';

function ReservationsSummaryCard () {

    
    const [reservationList, setReservationList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const url = import.meta.env.VITE_API_URL;

// get the list of all reservations to display list
    const getList = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);

        try {
          const { data } = await axios.get(`${url}/api/reservations`);
          console.log(data);
          setReservationList(data);
          setIsLoading(false);
        } catch (error) {
          console.error(`Could not fetch reservations list ${error}`);
          setIsError(true);
        }
      }, []);

      useEffect(() => {
        getList();
      }, [getList]);

    return (
        <Card title="Total Reservations" value={reservationList? reservationList.length : ''}/>
    );
}

export default ReservationsSummaryCard;