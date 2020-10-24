import React from 'react';
import Search from './search';
import Popular from './popular';
import Genre from './genre';

import { LazyLoadComponent } from 'react-lazy-load-image-component';

export default function Home() {
  return (
      <div className="App">
        <h1 className="app-title">Moview</h1>
        <p className="app-desc">the movie search app</p>
        <Search />
        <Popular />
        <LazyLoadComponent>
          <Genre genre="28" />
        </LazyLoadComponent>
        <LazyLoadComponent>
          <Genre genre="35" />
        </LazyLoadComponent>
        <LazyLoadComponent>
          <Genre genre="18" />
        </LazyLoadComponent>
        <LazyLoadComponent>
          <Genre genre="27" />
        </LazyLoadComponent>
        <LazyLoadComponent>
          <Genre genre="16" />
        </LazyLoadComponent>
        <LazyLoadComponent>
          <Genre genre="10749" />
        </LazyLoadComponent>
        <LazyLoadComponent>
          <Genre genre="878" />
        </LazyLoadComponent>
        <LazyLoadComponent>
          <Genre genre="12" />
        </LazyLoadComponent>
        <LazyLoadComponent>
          <Genre genre="53" />
        </LazyLoadComponent>
        <LazyLoadComponent>
          <Genre genre="14" />
        </LazyLoadComponent>
        <LazyLoadComponent>
          <Genre genre="80" />
        </LazyLoadComponent>
        <LazyLoadComponent>
          <Genre genre="9648" />
        </LazyLoadComponent>
        <LazyLoadComponent> 
          <Genre genre="99" />
        </LazyLoadComponent>
      </div>
  );
}