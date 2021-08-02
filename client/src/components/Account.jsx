import Nav from '../components/Nav';
import { Link } from 'react-router-dom';

function Account() {
    return(
        <>
        <Nav/>
        
        <div className="container">
            <div className="jumbo">
                <h1>Account</h1>

                <ul>
                    <li><Link>Manage My Account</Link></li>
                    <li><Link to='/Links'>Manage My Links</Link></li>
                </ul>
            </div>
        </div>

        </>
    )
}

export default Account;