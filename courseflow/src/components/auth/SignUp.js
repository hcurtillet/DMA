import React, {useCallback, useState, useRef} from 'react'
import {Card, Form, Button, Alert} from 'react-bootstrap'
import {useAuth} from '../../context/AuthProvider'
import app from '../../firebase'


function SignUp() {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
        await app
            .auth()
            .createUserWithEmailAndPassword(email.value, password.value);
        } catch (error) {
        alert(error);
        }
    }, []);
    return (
        <div>

            <h2>Sign Up</h2>
            <form onSubmit={handleSignUp}>
                <label>
                Email
                <input name="email" type="email" placeholder="Email" />
                </label>
                <label>
                Password
                <input name="password" type="password" placeholder="Password" />
                </label>
                <button type="submit">Sign Up</button>
            </form>


            <div className="w-100 text-center">
                Already have an account? Log In
            </div>
        </div>
    )
}

export default SignUp
