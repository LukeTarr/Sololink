import Nav from '../components/Nav';
import '../styles/home.css';

function Home() {
  return (
    <>
      <Nav></Nav>

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
