import Button from '../Button/Button';
import Layout from '../Layout/Layout';
import './ReservationList.scss';

function ReservationList ({data}) {
    // console.log(data);
    const block = 'reservations';

    function dateConversion (item) {
        const time = new Date(item);
        const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        // Get the day of the week, day, and month
        const dayOfWeek = weekDays[time.getDay()];
        const day = time.getDate();
        const month = monthNames[time.getMonth()];
        
        // Format the date
        let date = `${dayOfWeek}, ${day}, ${month}`;
        return date;
    }

    return (
        <Layout className={block}>
            <nav className={`${block}__navigation`}>
                <h1 className={`${block}__title`}>Reservations</h1>
                <Button type='primary' to='/reservations/add' className={`${block}__button`}>Add new Reservation</Button>
            </nav>
            <section className={`${block}__container`}>
                <section className={`${block}__label`}>
                    <ul className={`${block}__label-list`}>
                        <li className={`${block}__label-item ${block}__label-item--room-id`}>Room ID</li>
                        <li className={`${block}__label-item ${block}__label-item--room-number`}>Room Number</li>
                        <li className={`${block}__label-item ${block}__label-item--guests-number`}>No of Guests</li>
                        <li className={`${block}__label-item ${block}__label-item--guest-name`}>Guest Name</li>
                        <li className={`${block}__label-item ${block}__label-item--check-in`}>Check-in Time</li>
                        <li className={`${block}__label-item ${block}__label-item--check-out`}>Check-out Time</li>
                        <li className={`${block}__label-item ${block}__label-item--action`}>Actions</li>
                    </ul>

                </section>
                <section className={`${block}__content`}>
                
                    {data.map((item) => {
                        return (
                            <ul key={item.id} className={`${block}__list`}>
                                <li className={`${block}__list-item ${block}__list-item--room-id`}>{item.room_id}</li>
                                <li className={`${block}__list-item ${block}__list-item--room-number`}>{item.room_number}</li>
                                <li className={`${block}__list-item ${block}__list-item--guests-number`}>{item.no_of_guests}</li>
                                <li className={`${block}__list-item ${block}__list-item--guest-name `}>{item.guest_name}</li>
                                <li className={`${block}__list-item ${block}__list-item--check-in`}>{dateConversion(item.check_in)}</li>
                                <li className={`${block}__list-item ${block}__list-item--check-out`}>{dateConversion(item.check_out)}</li>
                                <li className={`${block}__list-item ${block}__list-item--action`}>
                                    <Button type='secondary' className={`${block}__button`}>View</Button>
                                </li>
                            </ul> 
                        )
                    })}
                </section>   
                   
            </section>
        </Layout>
    );
}

export default ReservationList;