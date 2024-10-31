import './Button.scss'
import { Link } from 'react-router-dom';

function Button ({type='primary', to='', onClick, className, children}) {
    const buttonClass = `button button--${type} ${className}`
    const Tag = to ? Link : "button";
    return (
        <Tag to={to} className={buttonClass} onClick={onClick}>{children}</Tag>
    );
}

export default Button;