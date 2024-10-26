import './RoomsSummaryCard.scss';
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Card from '../Card/Card';

function RoomsSummaryCard () {

    
    const [roomsList, setRoomsList] = useState([]);
    const [isError, setIsError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const url = import.meta.env.VITE_API_URL;

// get the list of all rooms to display list
    const getList = useCallback(async () => {
        setIsLoading(true);
        setIsError(false);

        try {
          const { data } = await axios.get(`${url}/api/rooms`);
          console.log(data);
          setRoomsList(data);
          setIsLoading(false);
        } catch (error) {
          console.error(`Could not fetch rooms list ${error}`);
          setIsError(true);
        }
      }, []);

      useEffect(() => {
        getList();
      }, [getList]);

      const occupiedRooms = roomsList.filter((room) => { return room.status === 'Occupied'})
      console.log(occupiedRooms);

      const occupancyRate = occupiedRooms.length/roomsList.length * 100;
      console.log(occupancyRate);

    return (
      <>
        <Card title="Total Rooms" value={roomsList? roomsList.length : ''}/>
        <Card title="Occupancy Rate" value={`${occupancyRate}%`}/>
      </>

    );
}

export default RoomsSummaryCard;