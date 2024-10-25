import Layout from "../../components/Layout/Layout";
import ReservationsSummaryCard from "../../components/ReservationsSummaryCard/ReservationsSummaryCard";

function DashboardPage () {
    return (
        // <section></section>
        <Layout className='dashboard'>
            <ReservationsSummaryCard />

        </Layout>
    );
}

export default DashboardPage;