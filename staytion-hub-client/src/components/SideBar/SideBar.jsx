import './SideBar.scss'
import { Link, NavLink } from "react-router-dom";
import logo from '../../assets/staytionHub.svg';
import dashboardIcon from '../../assets/dashboard.png';
import dashboardIconActive from '../../assets/dashboard-active.png';
import roomIcon from '../../assets/rooms.png';
import roomIconActive from '../../assets/rooms-active.png';
import reservationIcon from '../../assets/booking.png';
import reservationIconActive from '../../assets/booking-active.png';
import guestIcon from '../../assets/profile.png';
import guestIconActive from '../../assets/profile-active.png';


function SideBar () {
    return (
            <section className='side-bar'>
                <Link className='side-bar__logo-link' to='/'>
                    <img  className='side-bar__logo' src={logo} alt='Website logo'/>
                </Link>
                <nav className='side-bar__navigation'>
                <ul className='side-bar__list'>
                        <li className='side-bar__list-item'>
                            <NavLink 
                                    to='/' 
                                    className={ ({isActive}) => isActive? 'side-bar__link side-bar__link--active' : 'side-bar__link'} >
                                    {({isActive}) => (
                                        <>
                                            <img  className='side-bar__icon--dashboard' src={ isActive ? dashboardIconActive : dashboardIcon} alt='Dashboard Icon'/>
                                            <span>Dashboard</span>
                                        </>
                                    )}
                            </NavLink>
                        </li>
                        <li className='side-bar__list-item'>
                            <NavLink 
                                    to='/reservations' 
                                    className={ ({isActive}) => isActive? 'side-bar__link side-bar__link--active' : 'side-bar__link'} >
                                    {({isActive}) => (
                                        <>
                                            <img  className='side-bar__icon' src={ isActive ? reservationIconActive : reservationIcon} alt='Reservation Icon'/>
                                            <span>Reservations</span>
                                        </>
                                    )}
                            </NavLink>
                        </li>
                        <li className='side-bar__list-item'>
                            <NavLink 
                                    to='/guests'   
                                    className={ ({isActive}) => isActive? 'side-bar__link side-bar__link--active' : 'side-bar__link'} >
                                    {({isActive}) => (
                                        <>
                                            <img  className='side-bar__icon' src={ isActive ? guestIconActive : guestIcon} alt='Guests Icon'/>
                                            <span>Guests</span>
                                        </>
                                    )}
                            </NavLink>
                        </li>
                        <li className='side-bar__list-item'>
                            <NavLink 
                                    to='/rooms' 
                                    className={ ({isActive}) => isActive? 'side-bar__link side-bar__link--active' : 'side-bar__link'} >
                                    {({isActive}) => (
                                        <>
                                            <img  className='side-bar__icon' src={ isActive ? roomIconActive : roomIcon} alt='Rooms Icon'/>
                                            <span>Rooms</span>
                                        </>
                                    )}
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </section>
    );
}

export default SideBar;