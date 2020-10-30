import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from 'react-router-dom';

class CastDisplay extends React.Component {
    // constructor(props) {
    //     super(props);
    // }

    render() {
        const cast = this.props.credits.cast;
        let castWithPics = 0;
        if (cast) {
            castWithPics = cast.filter((person) => person.profile_path).length;
        }

        return (
            <div className="details-cast-wrapper">
                <h3 className="details-subheads">Cast</h3>
                <div className="details-cast">
                    {cast && castWithPics > 0 ?
                        <Swiper 
                            loop={true} 
                            slidesPerView={'auto'}>
                            {cast
                                .filter((person) => person.profile_path)
                                .map(person => (
                                    <SwiperSlide className="no-hover-slide" key={person.id}>
                                        <Link
                                            key={person.id} 
                                            to={{
                                                pathname: `../actor/${person.id}`,
                                        }}>
                                            <img 
                                                className="cast-img"
                                                src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2/${person.profile_path}`} 
                                                alt={`${person.name} headshot`} />
                                            <p className="details-actor">
                                                {person.name}
                                            </p>
                                        </Link>
                                            
                                    </SwiperSlide>
                                ))}
                        </Swiper>
                    :
                        cast ?
                            <Swiper 
                                loop={false} 
                                slidesPerView={'auto'}>
                                {cast
                                    .map(person => (
                                        <SwiperSlide className="no-hover-slide" key={person.id}>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-question-mark" width="64" height="64" viewBox="0 0 24 24" stroke-width="1.5" stroke="#fff" fill="none" stroke-linecap="round" stroke-linejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                <path d="M8 8a3.5 3 0 0 1 3.5 -3h1a3.5 3 0 0 1 3.5 3a3 3 0 0 1 -2 3a3 4 0 0 0 -2 4" />
                                                <line x1="12" y1="19" x2="12" y2="19.01" />
                                            </svg>
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
        );
    }
    
}   export default CastDisplay