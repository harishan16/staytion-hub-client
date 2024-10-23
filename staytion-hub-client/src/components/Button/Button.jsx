import './Button.scss'
import { Link } from 'react-router-dom';

function Button ({type='primary', to='', className, children}) {
    const buttonClass = `button button--${type} ${className}`
    const Tag = to ? Link : "button";
    return (
        <Tag to={to} className={buttonClass}>{children}</Tag>
    );
}

export default Button;