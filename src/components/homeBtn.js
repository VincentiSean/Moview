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
                to={{
                    pathname: `/index.html`,
                }}
            >
            <p>Home</p>
            </Link>
        );
    }

} export default HomeBtn