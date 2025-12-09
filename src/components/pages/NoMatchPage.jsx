import React from "react"
import { Link } from "react-router";

function NoMatchPage() {
    return (
        <div>
            <title>404</title>
            <h2>That's a 404.</h2>
            <p>Uh oh, looks like you're lost!</p>
            <p>
                <Link to="/">Back to safety.</Link>
            </p>
        </div>
    );
}

export default NoMatchPage;