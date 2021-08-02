import Home from '../src/components/Home';
import './app.css';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import Account from './components/Account';
import Links from './components/Links'

function App() {
  return (
    <Router>
      <Switch>
      <Route path="/Links">
          <Links />
        </Route>
      <Route path="/Account">
          <Account />
        </Route>
        <Route path="/Register">
          <Register />
        </Route>
        <Route path="/Login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
       
      </Switch>
    </Router>
  );
}

export default App;
