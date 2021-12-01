import React, {useState, useRef} from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import { Logo, CenterContainer } from '../../components';
import {
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

function Login({navigation}) {
    const emailRef = useRef();
    const passwordRef = useRef();
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleLogin(e){
        e.preventDefault();
        try {
            setError("");
            setLoading(true);
            await auth.signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value);
            navigation.replace('Home');
        } catch {
            setError('Failed to log in');
        }
        setLoading(false);
    }

    return (
        <CenterContainer>
            <StyledCard>
                <Text style={styles.title}>Login</Text>
                <Logo/>
                <StyledForm onSubmit={handleLogin}>
                {error && <StyledAlert variant="danger">{error}</StyledAlert>}
                    <StyledInput id="email">
                        <StyledEmailIcon />
                        <StyledForm.Control
                        type="email"
                        placeholder="Email"
                        name="email"
                        ref={emailRef}
                        required
                        />
                    </StyledInput>

                    <StyledInput id="password">
                        <StyledPasswordIcon />
                        <StyledForm.Control
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
                    <View style={styles.row}>
                        <TouchableOpacity
                        onPress={() => navigation.navigate('ForgetPassword')}
                        >
                        <Text style={styles.link}>Forgot your password?</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.row}>
                        <Text>
                            Create a new account? 
                            <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
                                <Text style={styles.link}>Sign up</Text>
                            </TouchableOpacity>
                        </Text>
                    </View>
                </StyledForm>
            </StyledCard>
        </CenterContainer>
    )
}

export default Login
