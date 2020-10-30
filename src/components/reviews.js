import React from "react";

class Reviews extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            reviews: [],
            overflow: 'visible',
            height: 'auto',
            active_id: '',
        }
    }

    componentDidMount() {
        let movieID = this.props.movieID;
        this.fetchReviews(movieID);
    }

    fetchReviews(movieID) {
        const url = `https://api.themoviedb.org/3/movie/${movieID}/reviews?api_key=${process.env.REACT_APP_MOVIE_API_KEY}&language=en-US&page=1`;

        try {
            fetch(url)
                .then((response) => response.json())
                .then((data) => this.setState({ reviews: data.results }));
        } catch (err) {
            console.error(err);
        }
    }

    revealReview(reviewId) {
        if (reviewId === this.state.active_id) {
            this.setState({ active_id: '' });
        } else {
            this.setState({ active_id: reviewId });
        }
    }


    render() {
        const reviews = this.state.reviews;

        return (
            <div className="details-reviews-wrapper">
                        <div className="reviews-heading">
                            <h3 className="details-subheads">
                                Reviews
                            </h3> 
                            <h3 className="num-reviews">
                                ({reviews.length})
                            </h3>
                        </div>
                            {reviews.length > 0 ?
                                <div className="detail-reviews">
                                    {reviews.map(review => (
                                        <div key={review.id} className="review-card">
                                            <h4 className="review-author">
                                                {review.author}
                                            </h4>
                                            <div className="review-text-wrapper"
                                                style={{
                                                    overflowY: (review.id === this.state.active_id ? this.state.overflow : 'hidden'),
                                                    height: (review.id === this.state.active_id ? this.state.height : '144px'),
                                                }} >
                                                    <p className="review">
                                                        {review.content}
                                                    </p>
                                            </div>
                                            <button className="review-btn"
                                                onClick={this.revealReview.bind(this, review.id)} >
                                                <svg className="review-dot icon icon-tabler icon-tabler-point" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 5 20 20" strokeWidth="1.5" stroke="none" fill="#fff" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <circle cx="12" cy="12" r="4" />
                                                </svg>
                                                <svg className="review-dot icon icon-tabler icon-tabler-point" xmlns="http://www.w3.org/2000/svg"  width="12" height="12" viewBox="0 5 20 20" strokeWidth="1.5" stroke="none" fill="#fff" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <circle cx="12" cy="12" r="4" />
                                                </svg>
                                                <svg className="review-dot icon icon-tabler icon-tabler-point" xmlns="http://www.w3.org/2000/svg"  width="12" height="12" viewBox="0 5 20 20" strokeWidth="1.5" stroke="none" fill="#fff" strokeLinecap="round" strokeLinejoin="round">
                                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                                    <circle cx="12" cy="12" r="4" />
                                                </svg>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            :
                                <p className="no-reviews-text">
                                    There are no reviews for this movie.
                                </p>
                            }
                    </div>
        );
    }
    
}   export default Reviews


