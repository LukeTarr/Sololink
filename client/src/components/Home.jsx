import { useEffect, useState } from 'react';
import Nav from '../components/Nav';
import '../styles/home.css';
import { getAuthToken } from '../utils/authHelper';

function Home() {

  return (
    <>
      <Nav/>

      <div className="container">
        <div className="jumbo">
          <h1>Welcome to Sololink</h1>
          <h2>Create your single link to rule them all!</h2>
        </div>
      </div>
    </>
  );
}

export default Home;
