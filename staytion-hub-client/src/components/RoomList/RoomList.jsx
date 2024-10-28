// import Button from '../Button/Button';
import Layout from '../Layout/Layout';
import './RoomList.scss';

function RoomList ({data}) {
    console.log(data);
    const block = 'rooms';

    return (
        <Layout className={block}>
            <nav className={`${block}__navigation`}>
                <h1 className={`${block}__title`}>Rooms</h1>
                {/* <Button type='primary' to='/guests/add' className={`${block}__button`}>Add new Guest</Button> */}
            </nav>
            <section className={`${block}__container`}>
                <section className={`${block}__label`}>
                    <ul className={`${block}__label-list`}>
                        <li className={`${block}__label-item ${block}__label-item--room-number`}>Room Number</li>
                        <li className={`${block}__label-item ${block}__label-item--room-type`}>Room Type</li>
                        <li className={`${block}__label-item ${block}__label-item--capacity`}>Capacity</li>
                        <li className={`${block}__label-item ${block}__label-item--status`}>Status</li>
                    </ul>
                </section>
                <section className={`${block}__content`}>
                    {data.map((item) => {
                        return (
                            <ul key={item.id} className={`${block}__list`}>
                                <li className={`${block}__list-item ${block}__list-item--room-number `}>{item.room_number}</li>
                                <li className={`${block}__list-item ${block}__list-item--room-type`}>{item.room_type}</li>
                                <li className={`${block}__list-item ${block}__list-item--capacity`}>{item.capacity}</li>
                                <li className={`${block}__list-item ${block}__list-item--status`}>{item.status}</li>
                            </ul> 
                        )
                    })}
                </section>   
                   
            </section>
        </Layout>
    );
}

export default RoomList;