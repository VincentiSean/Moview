import React from "react";
import { Link } from 'react-router-dom';

class MovieGenre extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            genreName: ''
        }
    }

    componentDidMount() {
        this.getGenreImage(this.props.genre);
    }

    getGenreImage(genreID) {
        let genreName = '';
        switch(genreID) {
            case 12:
                genreName = 'Adventure';
                break;
            case 14:
                genreName = 'Fantasy';
                break;
            case 16:
                genreName = 'Animation';
                break;
            case 18:
                genreName = 'Drama';
                break;
            case 27:
                genreName = 'Horror';
                break;
            case 28:
                genreName = 'Action';
                break;
            case 35:
                genreName = 'Comedy';
                break;
            case 36:
                genreName = 'History';
                break;
            case 37:
                genreName = "Western";
                break;
            case 53:
                genreName = 'Thriller';
                break;
            case 80:
                genreName = 'Crime';
                break;
            case 99:
                genreName = 'Documentary';
                break;
            case 878:
                genreName = 'Science Fiction';
                break; 
            case 9648:
                genreName = 'Mystery';
                break;  
            case 10402:
                genreName = 'Music';
                break;
            case 10749:
                genreName = 'Romance';
                break;
            case 10751:
                genreName = 'Family';
                break;
            case 10752:
                genreName = 'War';
                break;
            case 10770:
                genreName = 'Tv Movie';
                break;
            default:
                genreName = '';
                break;
        }
        this.setState({
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
                <p className="movie-genre-btn">
                    {this.state.genreName}  
                </p>
            </Link>
        )
    }
} 

export default MovieGenre