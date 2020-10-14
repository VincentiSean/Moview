import React, {useState} from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import MovieCard from '../components/movieCard';

export default function Search() {
    
    // states
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const searchMovies = async (e) => {
        e.preventDefault();
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`;
        const encodedURL = encodeURI(url); // Keeps spaces and special characters
        try {
            const res = await fetch(encodedURL);
            const data  = await res.json();
            setMovies(data.results);
        } catch (err) {
            console.error(err);
        }

    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <svg xmlns="http://www.w3.org/2000/svg" className="searchSVG icon icon-tabler icon-tabler-search" width="44" height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
                <input 
                    className="search-input"
                    onChange={(e) => setQuery(e.target.value)}
                    type="text" 
                    name="query" 
                    value={query}
                    placeholder="Movies" />
            </form>
            {movies.length > 0 ?   
                        <Swiper loop={true} slidesPerView={'auto'}>
                            {movies
                                .filter((movie) => movie.poster_path)
                                .map((movie) => (
                                <SwiperSlide 
                                    key={movie.id}>
                                    <MovieCard movie={movie}/>
                                    {/* {movie.title} */}
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    :
                        <h2></h2>
                }
        </>
    )
}