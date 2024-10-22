import Button from '../Button/Button';
import Layout from '../Layout/Layout';
import './ReservationList.scss';

function ReservationList ({data}) {
    console.log(data);
    const block = 'reservations';
    return (
        <Layout className={block}>
            <nav className={`${block}__navigation`}>
                <h1 className={`${block}__title`}>Reservations</h1>
                <Button type='primary' className={`${block}__button`}>Add new Reservation</Button>
            </nav>
            <section className={`${block}__container`}>
                <ul className={`${block}__list`}>
                    {data.map((item) => {
                        return (
                            <li className={`${block}__list-item`}>{}</li>
                        )
                    })}
                    
                </ul>    
            </section>
        </Layout>
    );
}

export default ReservationList;