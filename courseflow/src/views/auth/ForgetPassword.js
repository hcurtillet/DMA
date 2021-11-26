import React, { useState, useRef }from 'react';
import { Link } from "react-router-dom";
import { useAuth } from '../../context/AuthProvider';
import {Form, Alert} from 'react-bootstrap';
import { CenterContainer } from '../../components';
import {
    StyledEmailIcon,
    StyledButton,
    StyledInput,
    StyledLink,
    StyledCard,
    StyledTitle
} from './style';


function ForgetPassword() {
    const emailRef = useRef();
    const [error, setError]=useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const { resetPassword } = useAuth();

    async function handleReset(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await resetPassword(emailRef.current.value);
            setMessage("Check your inbox for further instructions!");
        } catch {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <CenterContainer>
            <StyledCard>
                <StyledTitle>Reset Password</StyledTitle>
                {error && <Alert variant="danger">{error}</Alert>}
                {message && <Alert variant="success">{message}</Alert>}
                    <Form onSubmit={handleReset}>
                        <StyledInput id="email">
                            <StyledEmailIcon/>
                            <Form.Control type="email" ref={emailRef} required />
                        </StyledInput >

                        <StyledButton disabled={loading} type="submit">
                            Reset Password
                         </StyledButton>
                    </Form>
                    <StyledLink>
                        <Link to="/login">Log in</Link>
                    </StyledLink>
            </StyledCard>
        </CenterContainer>
    )
}

export default ForgetPassword
