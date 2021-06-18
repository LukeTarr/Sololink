import '../styles/nav.css';
import logo from '../sololink.svg';
import { Link } from 'react-router-dom';

function Nav() {
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
          </ul>
        </nav>
      </header>
    </>
  );
}

export default Nav;
