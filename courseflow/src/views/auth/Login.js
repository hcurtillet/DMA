import React, {useCallback, useState, useRef} from 'react';
import { Link } from "react-router-dom";
import {Form, Alert} from 'react-bootstrap';
import { useAuth } from '../../context/AuthProvider';
import { CenterContainer, Logo } from '../../components';
import {
    StyledEmailIcon,
    StyledPasswordIcon,
    StyledButton,
    StyledInput,
    StyledLink,
    StyledCard,
    StyledTitle
} from './style';

function Login() {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError]=useState('');

    const handleLogin = useCallback(async event => {
        event.preventDefault();
        try {

        } catch (error) {
            setError(error);
        }
    }, []);


    return (
        <CenterContainer>
            <StyledCard>
                <StyledTitle>Login</StyledTitle>
                <Logo/>
                <Form onSubmit={handleLogin}>
                    {error && <Alert variant="danger">{error}</Alert>}

                    <StyledInput id="email">
                        <StyledEmailIcon/>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            name="email"
                            ref={emailRef}
                            required
                        />
                    </StyledInput>

                    <StyledInput id="password">
                        <StyledPasswordIcon/>
                        <Form.Control
                            name="password"
                            placeholder="Password"
                            type="password"
                            ref={passwordRef}
                            required
                        />
                    </StyledInput>
                    <StyledButton type="submit">
                        Login
                    </StyledButton>
                </Form>
            </StyledCard>

            <StyledLink>
                Need an account? <Link to="/signup">Sign Up</Link>
            </StyledLink>
        </CenterContainer>
    )
}

export default Login
