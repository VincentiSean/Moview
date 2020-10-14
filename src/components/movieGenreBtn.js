import React from "react";
import {ReactSVG} from 'react-svg';
import { Link } from 'react-router-dom';

import Documentary from '../imgs/documentary.svg';
import Drama from '../imgs/drama.svg';
import Horror from '../imgs/horror.svg';
import Mystery from '../imgs/mystery.svg';
import Thriller from '../imgs/thriller.svg';
import Gun from '../imgs/gun.svg';
import Map from '../imgs/map.svg';
import Magic from '../imgs/magic.svg';
import Police from '../imgs/police.svg';
import Jester from '../imgs/jester.svg';
import Cartoon from '../imgs/cartoon.svg';
import Ufo from '../imgs/ufo.svg';
import Heart from '../imgs/heart.svg';
import Family from '../imgs/family.svg';
import History from '../imgs/history.svg';
import Music from '../imgs/music.svg';
import TV from '../imgs/tvmovie.svg';
import War from '../imgs/war.svg';
import Western from '../imgs/western.svg';

class MovieGenre extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            imgURL: '',
            genreName: ''
        }
    }

    componentDidMount() {
        this.getGenreImage(this.props.genre);
    }

    getGenreImage(genreID) {
        let img, genreName = '';
        switch(genreID) {
            case 12:
                img = Map;
                genreName = 'Adventure';
                break;
            case 14:
                img = Magic;
                genreName = 'Fantasy';
                break;
            case 16:
                img = Cartoon;
                genreName = 'Animation';
                break;
            case 18:
                img = Drama;
                genreName = 'Drama';
                break;
            case 27:
                img = Horror;
                genreName = 'Horror';
                break;
            case 28:
                img = Gun;
                genreName = 'Action';
                break;
            case 35:
                img = Jester;
                genreName = 'Comedy';
                break;
            case 36:
                img = History;
                genreName = 'History';
                break;
            case 37:
                img = Western;
                genreName = "Western";
                break;
            case 53:
                img = Thriller;
                genreName = 'Thriller';
                break;
            case 80:
                img = Police;
                genreName = 'Crime';
                break;
            case 99:
                img = Documentary;
                genreName = 'Documentary';
                break;
            case 878:
                img = Ufo;
                genreName = 'Science Fiction';
                break; 
            case 9648:
                img = Mystery;
                genreName = 'Mystery';
                break;  
            case 10402:
                img = Music;
                genreName = 'Music';
                break;
            case 10749:
                img = Heart;
                genreName = 'Romance';
                break;
            case 10751:
                img = Family;
                genreName = 'Family';
                break;
            case 10752:
                img = War;
                genreName = 'War';
                break;
            case 10770:
                img = TV;
                genreName = 'Tv Movie';
                break;
            default:
                img = {};
                genreName = '';
                break;
        }
        this.setState({
            imgURL: img,
            genreName: genreName
        })
    }

    render() {
        return(
            <Link
                className="genre-link"
                key={this.props.genre} 
                to={{
                    pathname: `genre/${this.state.genreName}`,
                }}
            >
                <button className="movie-genre-btn">
                    <img className="genre-svg" src={this.state.imgURL} alt={this.state.genreName} />
                </button>
            </Link>
        )
    }
} 

export default MovieGenre