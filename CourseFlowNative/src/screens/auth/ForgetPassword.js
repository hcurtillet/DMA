import React, {useState, useRef} from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import { Logo, CenterContainer } from '../../components';
import{
    StyledCard,
    StyledForm,
    StyledEmailIcon,
    StyledInput,
    StyledAlert,
    StyledButton,
    styles
} from './style';
import {auth} from '../../../firebase';

export default function ForgetPassword({navigation}) {
    const emailRef = useRef();
    const [error, setError]=useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    
    async function handleReset(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await auth.sendPasswordResetEmail(emailRef.current.value);
            setMessage("Check your inbox for further instructions!");
        } catch {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <CenterContainer>
            <StyledCard>
            <Text style={styles.title}>Reset Password</Text>
                <Logo/>
                {error && <StyledAlert variant="danger">{error}</StyledAlert>}
                {message && <StyledAlert variant="success">{message}</StyledAlert>}
                <StyledForm onSubmit={handleReset}>
                        <StyledInput id="email">
                            <StyledEmailIcon/>
                            <StyledForm.Control type="email" ref={emailRef} required />
                        </StyledInput >

                        <StyledButton disabled={loading} type="submit">
                            Reset Password
                         </StyledButton>
                    </StyledForm>
                <View style={styles.row}>
                    <TouchableOpacity onPress={() => navigation.replace('Login')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </StyledCard>
        </CenterContainer>
    )
}
