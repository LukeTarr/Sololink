import Home from '../src/components/Home';
import './app.css';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from 'react-router-dom';
import Register from './components/Register';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/Account">
          <Register />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
