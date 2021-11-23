import React from 'react'
import { Link } from "react-router-dom";
export default function Home() {
    return (
        <div>
            <h1>Big Welcome</h1>
            Check <Link to="/profile">Profile</Link>
        </div>
    )
}
