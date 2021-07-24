import '../styles/nav.css';
import logo from '../sololink.svg';
import { Link } from 'react-router-dom';
import {getAuthToken, isLoggedIn, logout} from '../utils/authHelper';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';


function Nav() {

  const history = useHistory();
  const [userLoggedIn, _setUserLoggedIn] = useState(isLoggedIn);

  return (
    <>
      <header>
        <h1 className="intro">
          <img src={logo} alt="" id="ico" />
          <a id="introLink" href="/">
            Sololink
          </a>
        </h1>

        <nav>
          <ul className="linkList">
            <li>
              <Link className="navLink" to="/">
                Home
              </Link>
            </li>
            {userLoggedIn
            ? <>
            <li>
              <Link className="navLink" to="/Account">
                Account
              </Link>
            </li>
            <li>
              <Link className="navLink" onClick={() => {
                logout();
                history.push('/Login');
              }}>
                Logout
              </Link>
            </li>
            </>
            : <>
            <li>
              <Link className="navLink" to="/Register">
                Register
              </Link>
            </li>
            <li>
              <Link className="navLink" to="/Login">
                Login
              </Link>
            </li>
            </>
           }
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Nav;
