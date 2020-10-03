import React from "react";
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import MovieCard from '../components/movieCard';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, Mousewheel]);
const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;

class Popular extends React.Component {
    constructor(props) {
        super();
        this.state = {
            movies: []
        };
    }
    componentDidMount() {
        const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

        try {
            fetch(url)
                .then(response => response.json())
                .then(data => this.setState({ movies: data.results }));
        } catch (err) {
            console.error(err);
        }
    }

    render () {
        const movies = this.state.movies;
        return (
            <>
                <h2 className="category-title">Popular</h2>
                <Swiper 
                    spaceBetween={0}
                    navigation
                    mousewheel={true}
                >    
                    {movies.filter(movie => movie.poster_path).map(movie => (
                        <SwiperSlide 
                            key={movie.id}
                        >
                            <MovieCard 
                                movie={movie}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </>
        )
    }
}

export default Popular;