import { Link } from "react-router-dom";
import React, {useState, useRef} from 'react';
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
    const [error, setError]=useState('');
    const [loading, setLoading] = useState(false);
    const {signup} = useAuth()

    async function handleSignUp(e){
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Password does not match!')
        }
        try {
            await signup(emailRef.current.value, passwordRef.current.value)

        } catch {
            setError("Failed to sign up");
        }
        setLoading(false);
    };

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
                        <StyledButton disabled={loading} type="submit">
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
