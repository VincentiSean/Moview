import React from "react";
import { LazyLoadComponent } from 'react-lazy-load-image-component';

import MovieCard from './movieCard';
import HomeBtn from '../components/homeBtn';

class GenrePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genreID: 0,
            genreName: '',
            movies: [],
            pageNum: 20,
            pages: 1,
            prevPages: 1,
        }
    }

    componentDidMount() {
        const genreName = this.props.location.pathname.replace("/genre/", "");
        this.getGenreId(genreName);
    }

    getGenreId(genreName) {
        let genreID  = '';
        switch(genreName) {
            case "Adventure":
                genreID = 12;
                break;
            case "Fantasy":
                genreID = 14;
                break;
            case "Animation":
                genreID = 12;
                break;
            case "Drama":
                genreID = 18;
                break;
            case "Horror":
                genreID = 27;
                break;
            case "Action":
                genreID = 28;
                break;
            case "Comedy":
                genreID = 35;
                break;
            case "History":
                genreID = 36;
                break;
            case "Western":
                genreID = 37;
                break;
            case "Thriller":
                genreID = 53;
                break;
            case "Crime":
                genreID = 80;
                break;
            case "Documentary":
                genreID = 99;
                break;
            case "Science Fiction":
                genreID = 878;
                break; 
            case "Mystery":
                genreID = 9648;
                break;  
            case "Music":
                genreID = 10402;
                break;
            case "Romance":
                genreID = 10749;
                break;
            case "Family":
                genreID = 10751;
                break;
            case "War":
                genreID = 10752;
                break;
            case "Tv Movie":
                genreID = 10770;
                break;
            default:
                genreID = 0;
                break;
        }
        this.movieFetch(genreID, genreName);
    }

    // Make an API request to gather 140 movies and add to state
    movieFetch(genreID, genreName) {
        let movies = [];
        for (let i = 1; i <= 7; i++) {
            const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${i}&with_genres=${genreID}`;
            try {
                fetch(url)
                    .then((response) => response.json())
                    .then((data) => {
                        for (let j = 0; j < data.results.length; j++) {
                            movies.push(data.results[j]);

                            // Setting state here seems to prevent the array from reading as length=0
                            this.setState({
                                movies: movies
                            });
                        }
                    })
                    .then(this.setState({
                        genreID: genreID,
                        genreName: genreName,
                    }));
            } catch (err) {
                console.error(err);
            }
        }
    }

    // Changes how many movies are returned from 
    // slicing the movie array when the "More Movies"
    // button is clicked
    loadMoreMovies() {
        this.setState({
            pageNum: this.state.pageNum * this.state.pages,
            pages: this.state.pages + 1
        })
    }

    render() {
        let genreName = this.state.genreName; 
        let pageNum = this.state.pageNum;
        let moviesShowing = [];
        // Check to see if the movieFetch request happened 
        // and wait until at least 20 movies were gathered
        // Then display in Swiper (prevents swiper component from
        // not moving on pageload)
        if(this.state.movies.length >= 20) {
            moviesShowing = this.state.movies.slice(0, pageNum);
        }
        
        return (
            <>
                <div className="genre-page">
                    <div className="similar-genre-header">
                        <h1 className="category-title-large">
                            {genreName}
                        </h1>
                        <HomeBtn class="alt-home-btn" />
                    </div>
                    {moviesShowing.length > 0 ?   
                            <div className="full-page-grid">
                                {moviesShowing
                                    .filter((movie) => movie.poster_path)
                                    .filter((movie) => movie.release_date !== "")
                                    .sort((movie) => movie.popularity)
                                    .map((movie) => (
                                        <div className="swiper-slide" key={movie.id}>
                                            <LazyLoadComponent>
                                                <MovieCard movie={movie}/>
                                            </LazyLoadComponent>
                                        </div>
                                ))}
                                <div className="load-btn-wrapper">
                                    <button 
                                        className="load-btn" 
                                        onClick={() => { this.loadMoreMovies() }}>
                                            More Movies
                                    </button>
                                </div>
                            </div>
                        :
                        <></>
                    }
                </div>
            </>
            
        );
    }
    
}   export default GenrePage
