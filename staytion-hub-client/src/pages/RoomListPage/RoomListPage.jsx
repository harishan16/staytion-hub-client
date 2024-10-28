import RoomList from "../../components/RoomList/RoomList"
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function RoomListPage () {
    // alert('inside');

        const [roomList, setRoomList] = useState([]);
        const [isError, setIsError] = useState(false);
        const [isLoading, setIsLoading] = useState(true);
        const url = import.meta.env.VITE_API_URL;

        // get the list of all guest names
        const getRoomsList = useCallback(async () => {
            setIsLoading(true);
            setIsError(false);
  
        try {
            const { data } = await axios.get(`${url}/api/rooms`);
            console.log(data);
            setRoomList(data);
            setIsLoading(false);

        } catch (error) {
            console.error(`Could not fetch rooms list ${error}`);
        }
        }, []);
      
        useEffect(() => {
            getRoomsList();
        }, [getRoomsList]);

    if(isError) {
        return <h1>Sorry, there was some error in fetching the data</h1>
    }
    
    if(isLoading) {
        return <h1>Loading data...</h1>
    }
    
    return (
        <RoomList data={ roomList } />
    );
}

export default RoomListPage;