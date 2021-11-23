import React from 'react'
import logo from './Logo.png'
import './Logo.css';

export default function Logo() {
    return (
        <div>
        <img className="logo" src={logo} alt="logo"/>
        </div>
    )
}
