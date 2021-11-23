import { Link } from "react-router-dom";
import React, {useCallback, useState, useRef} from 'react';
import { useAuth } from '../../context/AuthProvider';
import {CenterContainer} from '../../components';
import {Alert} from 'react-bootstrap';
import {
    StyledEmailIcon,
    StyledPasswordIcon,
    StyledButton,
    StyledInput,
    StyledLink,
    StyledCard,
    StyledTitle,
    StyledForm
} from './style';


function SignUp() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const {signup} = useAuth()
    const [error, setError]=useState('');

    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Password does not match!')
        }
        try {
            await signup(emailRef.current.value, passwordRef.current.value)

        } catch (error) {
            setError(error);
        }
    }, []);

    return (
        <div>
            <CenterContainer>
                <StyledCard>
                    <StyledTitle>Sign Up</StyledTitle>
                    <StyledForm onSubmit={handleSignUp}>
                        {error && <Alert variant="danger">{error}</Alert>}

                        <StyledInput id="email">
                            <StyledEmailIcon/>
                            <StyledForm.Control
                                type="email"
                                placeholder="Email"
                                name="email"
                                ref={emailRef}
                                required
                            />
                        </StyledInput>

                        <StyledInput id="password">
                            <StyledPasswordIcon/>
                            <StyledForm.Control
                                name="password"
                                placeholder="Password"
                                type="password"
                                ref={passwordRef}
                                required
                            />
                        </StyledInput>

                        <StyledInput id="password-confirm">
                            <StyledPasswordIcon/>
                            <StyledForm.Control
                                name="password-confirm"
                                placeholder="Password Confirm"
                                type="password"
                                ref={passwordConfirmRef}
                                required
                            />
                        </StyledInput>
                        <StyledButton type="submit">
                            Sign Up
                        </StyledButton >
                    </StyledForm>
                </StyledCard>

                <StyledLink>
                    Already have an account? <Link to="/login">Login</Link>
                </StyledLink>
            </CenterContainer>
        </div>
    )
}

export default SignUp
