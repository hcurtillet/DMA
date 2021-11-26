import React, { useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
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
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await login(emailRef.current.value, passwordRef.current.value);
            navigate("/");
        } catch {
            setError("Failed to log in");
        }
        setLoading(false);
    };


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
                    <StyledButton disabled={loading} type="submit">
                        Login
                    </StyledButton>
                </Form>
            </StyledCard>
            <StyledLink>
                <Link to="/forget-password">Forget Password?</Link>
            </StyledLink>
            <StyledLink>
                Need an account? <Link to="/signup">Sign Up</Link>
            </StyledLink>
        </CenterContainer>
    )
}

export default Login
