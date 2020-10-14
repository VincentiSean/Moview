import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import MovieCard from './movieCard';

class GenrePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genreID: 0,
            genreName: '',
            movies: [],
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

    movieFetch(genreID, genreName) {
        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreID}`;
        console.log(url);
        try {
            fetch(url)
                .then((response) => response.json())
                .then((data) => this.setState({
                    genreID: genreID,
                    genreName: genreName,
                    movies: data.results
                }))
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        const movies = this.state.movies;
        console.log(this.state);
        return (
            <>
                <div className="genre-page">
                    <h1 className="category-title-large">{this.state.genreName}</h1>
                    {movies.length > 0 ?   
                        <>
                            <Swiper 
                                className="full-page-swiper" 
                                direction={'vertical'} 
                                // spaceBetween={10} 
                                // loop={true}
                                slidesPerView={'auto'}
                            >
                                {movies
                                    .filter((movie) => movie.poster_path)
                                    .map((movie) => (
                                    <SwiperSlide 
                                        key={movie.id}>
                                        <MovieCard movie={movie}/>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                            {/* <button className="load-btn">Load More</button> */}
                        </>
                        :
                            <h2></h2>
                    }
                </div>
            </>
            
        );
    }
    
}   export default GenrePage