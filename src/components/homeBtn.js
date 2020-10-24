import React from "react";
import { Link } from 'react-router-dom';

class HomeBtn extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return(
            <Link
                className={this.props.class}
                // key={this.props.genre} 
                to={{
                    pathname: `/`,
                }}
            >
            <p>Home</p>
            </Link>
        );
    }

} export default HomeBtn