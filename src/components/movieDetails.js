import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import MovieGenre from '../components/movieGenreBtn';
import MovieCard from '../components/movieCard';
import HomeBtn from '../components/homeBtn';

class MovieDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: [],
            movieGenres: [],
            credits: [],
            director: [],
            foundDirector: false,
            reviews: [],
            overflow: 'visible',
            height: 'auto',
            active_id: '',
            runtime: '',
            similarMovies: [],
            backdropURL: '',
        }
    }

    componentDidMount() {
        const movieId = this.props.location.pathname.replace("/", "");
        this.fetchMovie(movieId);
        this.fetchCrew(movieId);
        this.fetchReviews(movieId);
        this.fetchSimilar(movieId);
        
        window.scrollTo(0, 0);
    }

    fetchMovie(movieId) {
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US;`;

        try {
            fetch(url)
              .then((response) => response.json())
              .then((data) => this.setState(
                  { movie: data },
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

    fetchReviews(movieId) {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`;

        try {
            fetch(url)
                .then((response) => response.json())
                .then((data) => this.setState({ reviews: data.results }));
        } catch (err) {
            console.error(err);
        }
    }

    fetchSimilar(movieId) {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`;
        try {
            fetch(url)
              .then((response) => response.json())
              .then((data) => this.setState({ similarMovies: data.results }));
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
        const minutes = Number.parseFloat((runtime / 60) % 1).toFixed(2);

        // Turn the minutes and hours numbers into formated string
        const formatMin = ('' + minutes).split('.')[1];
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

    revealReview(reviewId) {
        if (reviewId === this.state.active_id) {
            this.setState({ active_id: '' });
        } else {
            this.setState({ active_id: reviewId });
        }
    }

    render() {
        const movie = this.state.movie;
        const cast = this.state.credits.cast;
        const similarMovies = this.state.similarMovies;
        const movieGenres = this.state.movieGenres;
        const reviews = this.state.reviews;

        return (
            <div className="movie-details-wrapper">
                <HomeBtn class="home-btn" />
                <div className="details-header">
                    <img 
                        className="movie-backdrop" 
                        src={`https://image.tmdb.org/t/p/w1000_and_h450_multi_faces/${movie.backdrop_path}`}
                        alt={`${movie.title} backdrop`} />
                    <h3 className="details-title">
                        {movie.title}
                    </h3>
                    <h5 className="details-tagline">
                        {movie.tagline}
                    </h5>
                </div>
                <div className="details-content">
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
                    <div className="details-overview">
                        <h3 className="details-subheads">Overview</h3>
                        <p className="overview-text">
                            {movie.overview}
                        </p>
                    </div>
                    <div className="details-cast-wrapper">
                        <h3 className="details-subheads">Cast</h3>
                        <div className="details-cast">
                            {cast ?
                                <Swiper 
                                    loop={true} 
                                    slidesPerView={'auto'}>
                                    {cast
                                        .filter((person) => person.profile_path)
                                        .map(person => (
                                        <SwiperSlide className="no-hover-slide" key={person.id}>
                                            <img 
                                                className="cast-img"
                                                src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2/${person.profile_path}`} 
                                                alt={`${person.name} headshot`} />
                                            <p className="details-actor">
                                                {person.name}
                                            </p>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            :
                                <></>
                            }
                        </div>
                    </div>
                    <div className="details-reviews-wrapper">
                        <div className="reviews-heading">
                            <h3 className="details-subheads">
                                Reviews
                            </h3> 
                            <h3 className="num-reviews">
                                ({reviews.length})
                            </h3>
                        </div>
                            {reviews.length > 0 ?
                                <div className="detail-reviews">
                                    {reviews.map(review => (
                                        <div key={review.id} className="review-card">
                                            <h4 className="review-author">
                                                {review.author}
                                            </h4>
                                            <div className="review-text-wrapper"
                                                style={{
                                                    overflowY: (review.id === this.state.active_id ? this.state.overflow : 'hidden'),
                                                    height: (review.id === this.state.active_id ? this.state.height : '144px'),
                                                }} >
                                                    <p className="review">
                                                        {review.content}
                                                    </p>
                                            </div>
                                            <button className="review-btn"
                                                onClick={this.revealReview.bind(this, review.id)} >
                                                <svg className="review-dot" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-point" width="12" height="12" viewBox="0 5 20 20" stroke-width="1.5" stroke="none" fill="#fff" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <circle cx="12" cy="12" r="4" />
                                                </svg>
                                                <svg className="review-dot" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-point" width="12" height="12" viewBox="0 5 20 20" stroke-width="1.5" stroke="none" fill="#fff" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <circle cx="12" cy="12" r="4" />
                                                </svg>
                                                <svg className="review-dot" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-point" width="12" height="12" viewBox="0 5 20 20" stroke-width="1.5" stroke="none" fill="#fff" stroke-linecap="round" stroke-linejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <circle cx="12" cy="12" r="4" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            :
                                <p className="no-reviews-text">
                                    There are no reviews for this movie.
                                </p>
                            }
                    </div>
                    <div className="similar-section">
                        <h3 className="details-subheads">
                            Similar Movies
                        </h3>
                        {similarMovies.length > 0 ?
                            <div className="similar-wrapper">
                                <Swiper 
                                    loop={true} 
                                    slidesPerView={'auto'}>
                                    {similarMovies
                                        .filter((movie) => movie.poster_path)
                                        .map((movie) => (
                                        <SwiperSlide key={movie.id}>
                                            <MovieCard movie={movie}/>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            </div>
                        :
                            <p className="no-reviews-text">
                                There are no similar movies at this time.
                            </p>
                        }
                    </div>
                </div>
            </div>
        );
    }
    
}   export default MovieDetails