import Layout from "../../components/Layout/Layout";
import ReservationsSummaryCard from "../../components/ReservationsSummaryCard/ReservationsSummaryCard";
import RoomsSummaryCard from "../../components/RoomsSummaryCard/RoomsSummaryCard";
import RoomsPieChart from "../../components/RoomsPieChart/RoomsPieChart";
import './DashboardPage.scss';
import axios from "axios";
import { useCallback, useEffect, useState } from "react";

function DashboardPage () {
    const block='dashboard';

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


    return (
        <Layout className={block}>
             <nav className={`${block}__navigation`}>
                <h1 className={`${block}__title`}>Dashboard</h1>
            </nav>
            <section className={`${block}__summary`}>
                <ReservationsSummaryCard />
                <RoomsSummaryCard roomsList={roomsList} />
            </section>
            <section className={`${block}__chart`}>
              <RoomsPieChart roomsList={roomsList} />
            </section>
        </Layout>
    );
}

export default DashboardPage;