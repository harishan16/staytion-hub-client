import './Layout.scss';

function Layout ({className='', children}) {
    return (
        <section className={`layout ${className}`}>
            {children}
        </section>
    );
}

export default Layout;