import './SideBar.scss'
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/staytionHub.svg';

function SideBar () {
    return (
            <section className='side-bar'>
                <Link className='side-bar__logo-link' to='/'>
                    <img  className='side-bar__logo' src={logo} alt='Website logo'/>
                </Link>
                <nav className='side-bar__navigation'>
                <ul className='side-bar__list'>
                        <li className='side-bar__list-item'>
                            <NavLink to='/' className={ ({isActive}) => isActive? 'side-bar__link side-bar__link--active' : 'side-bar__link'} >Dashboard</NavLink>
                        </li>
                        <li className='side-bar__list-item'>
                            <NavLink to='/reservations' className={ ({isActive}) => isActive? 'side-bar__link side-bar__link--active' : 'side-bar__link'} >Reservations</NavLink>
                        </li>
                        <li className='side-bar__list-item'>
                            <NavLink to='/guests' className={ ({isActive}) => isActive? 'side-bar__link side-bar__link--active' : 'side-bar__link'} >Guests</NavLink>
                        </li>
                        <li className='side-bar__list-item'>
                            <NavLink to='/rooms' className={ ({isActive}) => isActive? 'side-bar__link side-bar__link--active' : 'side-bar__link'} >Rooms</NavLink>
                        </li>
                    </ul>
                </nav>

            </section>
    );
}

export default SideBar;