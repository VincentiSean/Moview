import React from "react";
import { Link } from 'react-router-dom';

export default function MovieCard({movie}) {
    return (
        <div className="card">
                <div className="card--front">
                    <Link
                        className="card-link"
                        key={movie.title} 
                        to={{
                            pathname: `../${movie.id}`,
                    }}>
                        <img 
                            className="card--thumbnail" 
                            src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2/${movie.poster_path}`}   
                            alt={movie.title + ' poster'}
                        />
                    </Link>
                    <h3 className="card--title">{movie.title}</h3>
                    <div className="card--stats">
                        {/* Get substring of movie release for year */}
                        {movie.release_date ?
                            <p className="movie-date">
                                {movie.release_date.substring(0,4)}
                            </p>
                        :
                            <></>
                        }

                        {/* Get the rating for the movie */}
                        {movie.vote_average
                            ?   <p className="movie-score">
                                    {movie.vote_average *  10}%
                                </p>
                            :   <></>
                        }
                    </div>
                </div>
                <div className="card--back">
                    <div className="card--back-stats">
                        <p className="movie-stats">{movie.vote_average * 10}<span>Avg Vote</span></p>
                        <p className="movie-stats">{movie.vote_count}<span>Votes</span></p>
                    </div>
                    <Link 
                        className="similar-btn"
                        to={{
                            pathname: `../similar/${movie.title}?${movie.id}`,
                        }}>
                        See Similar Movies
                    </Link>
                </div>
                <div className="card--background">
                    <svg width="0" height="0" x="0px" y="0px">
                        <defs>
                            <clipPath id="wave" clipPathUnits="objectBoundingBox">
                                <path d="M1.5,0H1H0.5H0v0.8C0.3,0.8,0.3,1,0.5,1c0,0,0,0,0,0C0.8,1,0.8,0.8,1,0.8c0,0,0,0,0,0C1.3,0.8,1.3,1,1.5,1C1.8,1,1.8,0.8,2,0.8V0H1.5z" />
                                <animateTransform
                                    attributeName="transform"
                                    type="translate" 
                                    from="0 0"
                                    to="-200 0"
                                    begin="0s"
                                    dur="10s"
                                    repeatCount="indefinite"
                                />
                            </clipPath>
                        </defs>
                    </svg>
                    <img
                        className="background-image"
                        src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie.poster_path}`}   
                        alt={movie.title + ' poster'}
                    />
                </div>
        </div>
    )
}