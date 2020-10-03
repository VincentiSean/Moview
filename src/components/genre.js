import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import MovieCard from '../components/movieCard';

const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

class Genre extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            genre: this.props.genre,
            genreName: "",
            movies: []
        };
    }

    componentDidMount() {
        const genreNum = this.state.genre;

        const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${genreNum}`;

        try {
            fetch(url)
                .then((response) => response.json())
                .then(data => this.setState({ movies: data.results }));
        } catch (err) {
            console.error(err);
        }

        this.getGenreName(genreNum);
    }


    getGenreName(genreNum) {
        let title = "";
        switch(genreNum) {
            case "28":
                title = "Action";
                break;
            case "12":
                title = "Adventure";
                break;
            case "16":
                title = "Animation";
                break;
            case "35":
                title = "Comedy";
                break;
            case "80":
                title = "Crime";
                break;
            case "99":
                title = "Documentary";
                break;
            case "18":
                title = "Drama";
                break;
            case "14":
                title = "Fantasy";
                break;
            case "27":
                title = "Horror";
                break;
            case "9648":
                title = "Mystery";
                break;  
            case "10749":
                title = "Romance";
                break;
            case "878":
                title = "Science Fiction";
                break; 
            case "53":
                title = "Thriller";
                break;
            default:
                title = "";
                break;
        }

        this.setState({ genreName: title });
    }

    

    render () {
        const movies = this.state.movies;
        let genreCat = this.state.genreName;
        
        return (
            <>
                <h2 className="category-title">{genreCat}</h2>
                <Swiper 
                    spaceBetween={0}
                    slidesPerView={1}
                >    
                    {movies
                        .filter((movie) => movie.poster_path)
                        .map((movie) => (
                            <SwiperSlide key={movie.id}>
                                <MovieCard movie={movie}/>
                            </SwiperSlide>
                    ))}
                </Swiper>
            </>
        );
    }
}

export default Genre;