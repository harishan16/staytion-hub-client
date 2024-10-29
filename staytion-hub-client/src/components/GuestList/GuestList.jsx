import Button from '../Button/Button';
import Layout from '../Layout/Layout';
import './GuestList.scss';

function GuestList ({data}) {
    const block = 'guests';

    return (
        <Layout className={block}>
            <nav className={`${block}__navigation`}>
                <h1 className={`${block}__title`}>Guests</h1>
                <Button type='primary' to='/guests/add' className={`${block}__button`}>Add new Guest</Button>
            </nav>
            <section className={`${block}__container`}>
                <section className={`${block}__label`}>
                    <ul className={`${block}__label-list`}>
                        <li className={`${block}__label-item ${block}__label-item--guest-name`}>Guest Name</li>
                        <li className={`${block}__label-item ${block}__label-item--contact-number`}>Contact Number</li>
                        <li className={`${block}__label-item ${block}__label-item--contact-email`}>Contact Email</li>
                        <li className={`${block}__label-item ${block}__label-item--address`}>Address</li>
                    </ul>
                </section>
                <section className={`${block}__content`}>
                    {data.map((item) => {
                        return (
                            <ul key={item.id} className={`${block}__list`}>
                                <li className={`${block}__list-item ${block}__list-item--guest-name `}>{item.guest_name}</li>
                                <li className={`${block}__list-item ${block}__list-item--contact-number`}>{item.contact_number}</li>
                                <li className={`${block}__list-item ${block}__list-item--contact-email`}>{item.contact_email}</li>
                                <li className={`${block}__list-item ${block}__list-item--address`}>{item.address ? `${item.address}, ${item.city}, ${item.country}` : '-'}</li>
                            </ul> 
                        )
                    })}
                </section>   
            </section>
        </Layout>
    );
}

export default GuestList;