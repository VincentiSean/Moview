import React from "react";

import HomeBtn from "./homeBtn";
import MovieCard from './movieCard';

class SimilarPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movies: [],
            movieTitle: '',
        }
    }

    componentDidMount() {
        let movieName, movieId;
        if(this.props.location.search === "") {
            const movieInfo = this.props.location.pathname;
            movieName = movieInfo.split("?")[0].replace("/similar/", "");
            movieId = movieInfo.split("?")[1];
        } else {
            movieName = this.props.location.pathname.replace("/similar/", "");
            movieId = this.props.location.search.replace("?", "");
        }
        this.movieFetch(movieId, movieName);
        window.scrollTo(0, 0);
    }


    movieFetch(movieID, movieName) {
        const url = `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`;
        try {
            fetch(url)
                .then((response) => response.json())
                .then((data) => this.setState({
                    movies: data.results,
                    movieTitle: movieName,
                }));
        } catch (err) {
            console.error(err);
        }
    }

    

    render() {
        const movieTitle = this.state.movieTitle;
        const movies = this.state.movies;
        return (
            <>
                <div className="similar-page">
                    <div className="similar-genre-header">
                        <h1 className="similar-movie-header">
                            Movies Like {movieTitle}
                        </h1>
                        <HomeBtn class="alt-home-btn" />
                    </div>
                    
                    {movies.length > 0 ?   
                        <div className="full-page-grid">
                            {movies
                                .filter((movie) => movie.poster_path)
                                .map((movie) => (
                                    <div className="swiper-slide" key={movie.id}>
                                        <MovieCard movie={movie}/>
                                    </div>
                                ))}
                        </div>
                    :
                        <h2 className="no-similar-text">There are no movies similar movies at this time. Check again later.</h2>
                    }
                </div>
            </>
            
        );
    }
    
}   export default SimilarPage
