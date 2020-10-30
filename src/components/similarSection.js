import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';

import MovieCard from '../components/movieCard';

class SimilarSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           similarMovies: [],
        }
    }

    componentDidMount() {
        let movieID = this.props.movieID;
        this.fetchSimilar(movieID);
    }

    fetchSimilar(movieID) {
        const url = `https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`;
        try {
            fetch(url)
              .then((response) => response.json())
              .then((data) => this.setState({ similarMovies: data.results }));
        } catch (err) {
            console.error(err);
        }   
    }


    render() {
        const similarMovies = this.state.similarMovies;

        return (
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
                                .filter((movie) => movie.release_date !== "")
                                .sort((movie) => movie.popularity)
                                .map((movie) => (
                                    <SwiperSlide key={movie.id}>
                                        <MovieCard movie={movie}/>
                                    </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                :
                    <p className="no-reviews-text">
                        There have been no movies rated as similar at this time.
                    </p>
                }
            </div>
        );
    }
    
}   export default SimilarSection

