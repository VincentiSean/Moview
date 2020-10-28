import React from "react";

class Trailer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            videosInfo: [],
        }
    }

    componentDidMount(){
        this.fetchVideos(this.props.movieID);
    }

    fetchVideos(movieID) {
        const url = `https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US`

        try {
            fetch(url)
                .then((response) => response.json())
                .then((data) => this.setState({ videosInfo: data.results }, this.fetchTrailer));
        } catch(e) {
            console.error(e);
        }
    }

    // Only supports youtube as a trailer source, need to verify that is the default for TMDb!
    fetchTrailer() {
        const videosInfo = this.state.videosInfo;
        let trailer;

        // Find which video info is the trailer
        videosInfo.map((video) => {
            if (video.type === "Trailer") {
                trailer = video;
            }
        });

        console.log(trailer);
        if (trailer) {
            // Found a trailer!
            console.log("here");
            this.setState({ trailerURL: `https://www.youtube.com/embed/${trailer.key}` });
        } else {
            // No trailer
            this.setState({ noTrailer: true });
        }
    }

    render() {
        console.log(this.state.trailerURL);

        // Add css for mobile to desktop display!! ~~~~~~~~~~~~~~~~~~~~`
        return (
            <div>
                {!this.state.noTrailer ?
                    <iframe width="560" height="315" src={this.state.trailerURL} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                :
                    <></>
                }
            </div>
        );
    }
    
}   export default Trailer