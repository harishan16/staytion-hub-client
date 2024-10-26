import Layout from "../../components/Layout/Layout";
import ReservationsSummaryCard from "../../components/ReservationsSummaryCard/ReservationsSummaryCard";
import RoomsSummaryCard from "../../components/RoomsSummaryCard/RoomsSummaryCard";
import './DashboardPage.scss';

function DashboardPage () {
    const block='dashboard';
    return (
        <Layout className={block}>
             <nav className={`${block}__navigation`}>
                <h1 className={`${block}__title`}>Dashboard</h1>
            </nav>
            <section className={`${block}__summary`}>
                <ReservationsSummaryCard />
                <RoomsSummaryCard />
            </section>

        </Layout>
    );
}

export default DashboardPage;