import './Card.scss';

function Card ({title, value}) {

    return (
        <section className='card'>
            <p className='card__title'>{title}</p>
            <p className='card__value'>{value}</p>
        </section>
    );
}

export default Card;