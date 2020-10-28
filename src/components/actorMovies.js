import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import MovieCard from '../components/movieCard';

class SimilarSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           actorsMovies: [],
           movies: [],
        }
    }

    componentDidMount() {
        let actorID = this.props.id;
        this.fetchMovies(actorID);
    }

    fetchMovies(actorID) {
        const url = `https://api.themoviedb.org/3/person/${actorID}/movie_credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`;
        try {
            fetch(url)
              .then((response) => response.json())
              .then((data) => this.setState({ actorsMovies: data.cast }, this.fetchMovieInfo));
        } catch (err) {
            console.error(err);
        }   
    }

    fetchMovieInfo() {
        let actorMovies = this.state.actorsMovies;
        let movies = [];
        // console.log(actorMovies);
        for(let i = 0; i < actorMovies.length; i++) {
            let movieID = actorMovies[i].id;
            let url = `https://api.themoviedb.org/3/movie/${movieID}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US;`;
            // console.log(url);
            try {
                fetch(url)
                  .then((response) => response.json())
                  .then((data) => { 
                        movies.push(data);
                        // Setting state here seems to prevent the array from reading as length=0
                        this.setState({ movies: movies });
                  });
            } catch (err) {
                console.error(err);
            }  
        }
    }

    render() {
        let moviesShowing = [];
        // If all movie info has been collected, populate array
        if (this.state.actorsMovies.length == this.state.movies.length) {
            moviesShowing = this.state.movies;
        }
        
        return (
            <div className="more-movies-section">
                <h3 className="details-subheads">
                    Movies With This Actor
                </h3>
                {/* If array is populated initialize Swiper */}
                {moviesShowing.length > 0 ?
                    <div className="more-movies-wrapper">
                        <Swiper 
                            onSwiper={(swiper) => swiper.update()}
                            loop={true} 
                            slidesPerView={'auto'} >
                            {moviesShowing
                                .filter((movie) => movie.poster_path)
                                .map((movie) => (
                                    <SwiperSlide key={movie.id}>
                                        <LazyLoadComponent>
                                            <MovieCard movie={movie}/>
                                        </LazyLoadComponent>
                                    </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                :
                    <> </>
                }
            </div>
        );
    }
    
}   export default SimilarSection
