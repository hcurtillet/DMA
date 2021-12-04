import React, { useState } from 'react';
import { SafeAreaView, TouchableOpacity, View, Text, TextInput , Button} from 'react-native';
import{ styles } from './style';
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';

export default function SignUp() {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [passwordConfirm,setPasswordConfirm] = useState('');
    const [error, setError]=useState('');
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation(); 

    async function handleSignUp(e){
        e.preventDefault();
        if(password!== passwordConfirm){
            return setError('Password does not match!')
        }
        try {
            await auth.createUserWithEmailAndPassword(email, password)
            navigation.navigate('Login');
        } catch {
            setError("Failed to sign up");
        }
        setLoading(false);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Sign Up</Text>
            <View style={styles.form}>
                <View style={styles.row}>
                    {error ? <Text style={styles.alert}>{error}</Text> : null}
                </View>
                <TextInput 
                    style={styles.textInput} 
                    id="email"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChangeText={text => setEmail(text)}
                    required
                />

                <TextInput 
                    style={styles.textInput} 
                    id="password"
                    name="password"
                    placeholder="Password"
                    type="password"
                    onChangeText={text => setPassword(text)}
                    required
                    />

                <TextInput 
                    style={styles.textInput} 
                    id="password-confirm"
                    name="password-confirm"
                    placeholder="Password Confirm"
                    type="password"
                    onChangeText={text => setPasswordConfirm(text)}
                    required
                    />

                <Button 
                    style={styles.button}
                    title="Sign Up"
                    disabled={loading}
                    onPress={e =>handleSignUp(e)}
                > Sign Up
                </Button>

                <View style={styles.row}>
                    <Text>
                    Already have an account?
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.link}>Login</Text>
                    </TouchableOpacity>
                    </Text>
                </View>

            </View>



        </SafeAreaView>
    )
}
