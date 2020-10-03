import React from 'react';
import './App.css';
import Search from './components/search';
import Popular from './components/popular';
import Genre from './components/genre';

function App() {
  return (
    <div className="App">
      <Search />
      <Popular />
      <Genre genre="28" />
      <Genre genre="35" />
      <Genre genre="18" />
      <Genre genre="27" />
      <Genre genre="16" />
      <Genre genre="10749" />
      <Genre genre="878" />
      <Genre genre="12" />
      <Genre genre="53" />
      <Genre genre="14" />
      <Genre genre="80" />
      <Genre genre="9648" />
      <Genre genre="99" />
    </div>
  );
}

export default App;
