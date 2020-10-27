import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch
} from 'react-router-dom';
import './App.scss';

import Home from './components/home';
import MovieDetails from './components/movieDetails';
import GenrePage from './components/genrePage';
import SimilarPage from './components/similar';
import ActorPage from './components/actorPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path="/index.html" component={Home}></Route>
          <Route exact path="/:movie" component={props => <MovieDetails key={Date.now()} {...props} />}></Route>
          <Route exact path="/genre/:genre" component={GenrePage}></Route>
          <Route exact path="/similar/:movieName?:movieId" component={props => <SimilarPage key={Date.now()} {...props} />}></Route>
          <Route exact path="/actor/:castId" component={ActorPage}></Route>
        </Switch>
      </div>
    </Router>
    
  );
}

export default App;
