import './Header.css';
import icon from '../../icons/favicon.png';

function Header () {
    return (
        <div className="header">
            <div className='headerContainer'>
                <img src={icon} />
                <h1>SIL</h1>
            </div>
        </div>
    )
}

export default Header;