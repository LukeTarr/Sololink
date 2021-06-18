import Nav from './Nav';
import '../styles/register.css';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  function loginCall() {
    if (email.length === 0) {
      setError('Email must be filled out');
    } else if (password.length === 0) {
      setError('Password must be filled out');
    } else {
      setError(null);
    }
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
