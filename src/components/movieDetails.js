import React from "react";

import MovieGenre from '../components/movieGenreBtn';
import HomeBtn from '../components/homeBtn';
import CastDisplay from '../components/castDisplay';
import Reviews from '../components/reviews';
import SimilarSection from '../components/similarSection';
import Trailer from '../components/trailer';

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movieID: '',
            movie: [],
            movieGenres: [],
            credits: [],
            director: [],
            foundDirector: false,
            runtime: '',
            backdropURL: '',
            services: [],
        }
    }

    componentDidMount() {
        const movieId = this.props.location.pathname.replace("/", "");
        this.fetchMovie(movieId);
        this.fetchCrew(movieId);
        
        window.scrollTo(0, 0);
    }

    fetchMovie(movieId) {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US;`;

        try {
            fetch(url)
              .then((response) => response.json())
              .then((data) => this.setState(
                  { movie: data, movieID: movieId },
                  this.getGenres
                ));
        } catch (err) {
            console.error(err);
        }   
    }

    fetchCrew(movieId) {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.REACT_APP_MOVIE_API_KEY}`;

        try {
            fetch(url)
                .then((response) => response.json())
                .then((data) => this.setState(
                    { credits: data }, 
                    this.getDirector
                ));
        } catch (err) {
            console.error(err);
        }
    }


    getDirector() {
        let director = [];
        
        if (this.state.credits !== null){
            const crew = this.state.credits.crew;
            
            let i;
            for(i=0; i < crew.length; i++) {
                if (crew[i].job === 'Director') {
                    director = crew[i];
                }
            }
        }
        this.setState({ director: director, foundDirector: true });
    }

    getRuntime() {
        // Get runtime from movie JSON and convert to number
        const runtime = parseInt(this.state.movie.runtime);
        
        // Get the number of hours in float then round down to get absolute hours
        const hours = Math.floor(runtime / 60);
        
        // Get the remainder from converting to hours and round up to the nearest minute with parseFloat
        let minutes = Number.parseFloat((runtime / 60) % 1).toFixed(2);
        minutes = Math.ceil((minutes - (minutes / 60)) * 60);

        // Turn the minutes and hours numbers into formated string
        const formatMin = ('' + minutes);
        const strRuntime = hours + 'H ' + formatMin + 'M'
        
        this.setState({ runtime: strRuntime });
    }

    getGenres() {
        const movie = this.state.movie;
        let genres = [];
        let i;

        for (i=0; i < movie.genres.length; i++) {
            genres.push(movie.genres[i]);
        }

        this.setState({ movieGenres: genres });
        this.getRuntime();
    }

    render() {
        const movie = this.state.movie;
        const credits = this.state.credits;
        const movieGenres = this.state.movieGenres;

        return (
            <div className="movie-details-wrapper">
                <HomeBtn class="home-btn" />
                <div className="details-header">
                    {movie.backdrop_path ? 
                        <img 
                            className="movie-backdrop" 
                            src={`https://image.tmdb.org/t/p/w1000_and_h450_multi_faces/${movie.backdrop_path}`}
                            alt={`${movie.title} backdrop`} />
                    :
                        <></>
                    }
                    
                    <h3 className="details-title">
                        {movie.title}
                    </h3>
                    <h5 className="details-tagline">
                        {movie.tagline}
                    </h5>
                </div>
                <div className="details-content">
                    <div className="trailer-info-wrapper">
                        <div className="info-wrapper">
                            <div className="details-movie-info">
                                <p className="basic-details">
                                    Director: <span>{this.state.director.name}</span>
                                </p>
                                <p className="basic-details">
                                    Rating: <span>{movie.vote_average * 10}%</span>
                                </p>
                            </div>
                            <div className="details-movie-info">
                                <p className="basic-details">
                                    Runtime: <span>{this.state.runtime}</span>
                                </p>
                                <div className="details-genre">
                                    {movieGenres.map(genre => (
                                        <MovieGenre key={genre.id} genre={genre.id} />
                                    ))}
                                </div>
                            </div>
                        </div>
                        {/* Once we have a movie id => get trailer */}
                        {movie.id ? 
                            <Trailer movieID={movie.id} />
                        :
                            <></>
                        }
                    </div>
                    
                    <div className="details-overview">
                        <h3 className="details-subheads">Overview</h3>
                        <p className="overview-text">
                            {movie.overview}
                        </p>
                    </div>
                    {/* Display cast; doesn't need check because credits are loaded here */}
                    <CastDisplay credits={credits} />
                    {/* Check to see if the movie ID is set, if so; load reviews and similar movies sections
                        This check prevents null errors....
                    */}
                    {this.state.movieID !== "" ?
                        <> 
                            <Reviews movieID={this.state.movieID} />
                            <SimilarSection movieID={this.state.movieID} />
                        </>
                    :
                        <></>
                    }
                </div>
            </div>
        );
    }
    
}   export default MovieDetails