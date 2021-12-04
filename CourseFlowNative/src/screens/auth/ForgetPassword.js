import React, {useState, useRef} from 'react'
import { SafeAreaView, TouchableOpacity, View, Text, TextInput, Button } from 'react-native';
import { Logo } from '../../components';
import{
    styles
} from './style';
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';

export default function ForgetPassword() {
    const [email,setEmail] = useState('');
    const [error, setError]=useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const navigation = useNavigation(); 

    async function handleReset(e) {
        e.preventDefault();

        try {
            setError("");
            setLoading(true);
            await auth.sendPasswordResetEmail(email);
            setMessage("Check your inbox for further instructions!");
        } catch {
            setError("Failed to reset password");
        }

        setLoading(false);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Reset Password</Text>
            <Logo/>
            <View style={styles.row}>
                {error ? <Text style={styles.alert}>{error}</Text>:null}
                {message ? <Text style={styles.message}>{message}</Text>:null}
            </View>

            <View style={styles.form}>
                <TextInput
                    style={styles.textInput} 
                    id="email"
                    type="email" 
                    placeholder="Email"
                    onChangeText={text => setEmail(text)}
                    required 
                />

                <Button 
                    style={styles.button}
                    title="Reset Password"
                    mode="outlined"
                    disabled={loading}
                    onPress={e =>handleReset(e)}
                > Reset Password
                </Button>

                <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={styles.link}>Login</Text>
                </TouchableOpacity>
            </View>
            </View>


        </SafeAreaView>
    )
}
