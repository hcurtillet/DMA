import React, {useState, useRef} from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { CenterContainer } from '../../components';
import{
    StyledCard,
    StyledForm,
    StyledButton,
    StyledEmailIcon,
    StyledPasswordIcon,
    StyledInput,
    StyledAlert,
    styles
} from './style';
import {auth} from '../../../firebase';

export default function SignUp({navigation}) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const [error, setError]=useState('');
    const [loading, setLoading] = useState(false);

    async function handleSignUp(e){
        e.preventDefault();
        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Password does not match!')
        }
        try {
            await auth.createUserWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
            navigation.replace('Login');
        } catch {
            setError("Failed to sign up");
        }
        setLoading(false);
    };

    return (
        <CenterContainer>
            <StyledCard>
                <Text style={styles.title}>Sign Up</Text>
                <StyledForm onSubmit={handleSignUp}>
                    {error && <StyledAlert variant="danger">{error}</StyledAlert>}
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
                        {loading ? "Creating account…" : "Sign Up"}
                    </StyledButton >
                </StyledForm>

                <View style={styles.row}>
                    Already have an account?
                    <TouchableOpacity onPress={() => navigation.replace('Login')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                </View>
            </StyledCard>

        </CenterContainer>
    )
}
