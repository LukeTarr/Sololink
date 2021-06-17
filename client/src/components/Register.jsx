import Nav from './Nav';
import '../styles/register.css'
import { useState } from 'react';
import {useHistory} from 'react-router-dom';

const Register = (props) => {

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState(null);
  const history = useHistory();
  

  async function makePostReq() {

    const payload = {
      userName : userName,
      email: email,
      password1: password1,
      password2 : password2
    }

    if (payload.userName.length === 0){
      setError('Username must be filled out');
  } else if(email.length === 0){
    setError("Email must be filled out");
  } else if (password1.length === 0){
    setError('Password must be filled out');
  } else if (password2.length === 0){
    setError('Re-enter password');
  } else if (password1 !== password2){
    setError('Passwords don\'t match');
  } else {
    setError(null);

    await fetch('http://localhost:5000/auth/register',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    } )
    .then(response => response.json())
    .then(data => {
      if(data.error) {
        setError(data.error)
        console.log(data.error)
      } else {
        console.log("redirect should happen here")
         history.push('/');
      }
    });
  }
}



  return (
    <>
      <Nav />
      <div className="container">
        <div className="jumbo">
          <h1>Register</h1>

          {error && 
          <h1 className="error">{error}</h1>
          }

          <form className="registerForm">
            <label htmlFor="userName">Username</label>
            <input required={true} type="text" name="userName" onChange={(val) => setUserName(val.target.value)}/>

            <label htmlFor="email">Email</label>
            <input required={true} type="email" name="email" onChange={(val) => setEmail(val.target.value)}/>

            <label htmlFor="password1">Password</label>
            <input required={true} type="password" name="password1" onChange={(val) => setPassword1(val.target.value)}/>

            <label htmlFor="email">Re-enter Password</label>
            <input required={true} type="password" name="password2" onChange={(val) => setPassword2(val.target.value)}/>

            <input className="submit" type="button" value="Submit" onClick={makePostReq}/>
          </form>
        </div>
      </div>
    </>
  );
}

export default Register;
