import './Button.scss'

function Button ({type='primary', className, children}) {
    const buttonClass = `button button--${type} ${className}`
    return (
        <button className={buttonClass}>{children}</button>
    );
}

export default Button;