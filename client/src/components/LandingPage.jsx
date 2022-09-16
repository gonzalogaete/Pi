import React from "react";
import {Link} from 'react-router-dom';

export default function LandingPage(){
    return (
        <div>
            <h1>Pokemon Api</h1>
            <Link to='/home'>
                <button>Gotcha!</button>
            </Link>
        </div>
    )
}