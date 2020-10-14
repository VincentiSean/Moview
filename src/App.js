import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.scss';

import Home from './components/home';
import MovieDetails from './components/movieDetails';
import GenrePage from './components/genrePage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home}></Route>
          <Route exact path="/:movie" component={MovieDetails}></Route>
          <Route exact path="/genre/:genre" component={GenrePage}></Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
