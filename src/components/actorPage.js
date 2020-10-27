import React from "react";
import HomeBtn from '../components/homeBtn';
import ActorMovies from '../components/actorMovies';

class CastDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            actor: [],
        }
    }

    componentDidMount() {
        window.scroll(0,0);
        const actorID = this.props.location.pathname.split("r/")[1];
        
        const url = `https://api.themoviedb.org/3/person/${actorID}?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`;
        
        try {
            fetch(url)
                .then((response) => response.json())
                .then((data) => this.setState({ actor: data }));
        } catch (err) {
            console.error(err);
        }
    }

    render() {
        let actor = this.state.actor;
        let unfinishedBDay, 
            finishedBDay = "",
            age = "",
            finishedDDay = "";
        if(this.state.actor.birthday) {
            unfinishedBDay = actor.birthday.split("-");
            finishedBDay = unfinishedBDay[1] + "/" + unfinishedBDay[2] + "/" + unfinishedBDay[0];

            // If the actor died change the way age is calc and get death day info;
            // else don't worry
            if (this.state.actor.deathday) {
                let unfinishedDDay = this.state.actor.deathday.split("-");
                finishedDDay = unfinishedDDay[1] + "/" + unfinishedDDay[2] + "/" + unfinishedDDay[0];
                let deathYear = unfinishedDDay[0];
                age = deathYear - unfinishedBDay[0] + " years old";
            } else {
                let currDate = new Date();
                let currYear = currDate.getFullYear();
                age = currYear - unfinishedBDay[0] + " years old";
            }
        }
        
        
        return (
            <div className="actor-details-wrapper">
                <HomeBtn class="alt-home-btn" />
                <div className="actor-header">
                    <img className="actor-headshot" src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${actor.profile_path}`} alt={actor.name} />
                    <h3 className="details-title">
                        {actor.name}
                    </h3>
                    <a className="imdb-link" href={`https://www.imdb.com/name/${actor.imdb_id}/`} target="_blank">IMDB Page</a>
                </div>
                <div className="actor-details">
                    <div className="actor-info">
                        <p className="actor-bold">Known For</p>
                        <p>{actor.known_for_department}</p>
                    </div>
                    <div className="actor-info">
                        <p className="actor-bold">Born</p>
                        <p>{finishedBDay} ({age})</p>
                    </div>
                    {/* If the actor died, display that information */}
                    {actor.deathday !== null ?
                        <div className="actor-info">
                            <p className="actor-bold">Died</p>
                            <p>{finishedDDay}</p>
                        </div>
                    :
                        <></>
                    }
                    <div className="actor-info">
                        <p className="actor-bold">Birthplace</p>
                        <p>{actor.place_of_birth}</p>
                    </div>
                    <h3 className="details-subheads">Biography</h3>
                    <p className="actor-biography">{actor.biography}</p>
                </div>
                {actor.id ?
                    <ActorMovies id={actor.id} />
                :
                    <></>
                }
            </div>
        );
    }
    
}   export default CastDisplay

// Link to imdb actor page