import Nav from './Nav';
import '../styles/register.css';
import { useState } from 'react';
import {setAuthToken} from '../utils/authHelper';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();

  async function loginCall() {
    if (email.length === 0) {
      setError('Email must be filled out');
    } else if (password.length === 0) {
      setError('Password must be filled out');
    } else {
      setError(null);
    }

    const payload = {
      email: email,
      password: password
    }

    await fetch('http://localhost:5000/auth/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    } ).then(response => response.json())
    .then(data => {
      if(data.error) {
        setError(data.error)
      } else {
        if(data.token) {
          setAuthToken(data.token);
          history.push('/');
        } else {
          setError("Token Error");
        }
      }
    });
  }

  return (
    <>
      <Nav />
      <div className="container">
        <div className="jumbo">
          <h1>Login</h1>

          {error && <h1 className="error">{error}</h1>}

          <form className="registerForm">
            <label htmlFor="email">Email</label>
            <input
              required={true}
              type="email"
              name="email"
              onChange={(val) => setEmail(val.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              required={true}
              type="password"
              name="password"
              onChange={(val) => setPassword(val.target.value)}
            />

            <input
              className="submit"
              type="button"
              value="Submit"
              onClick={loginCall}
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
