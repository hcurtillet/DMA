import React, {useState} from 'react'
import { SafeAreaView, TouchableOpacity, View, Text, TextInput } from 'react-native';
import { Button } from 'react-native-paper';
import {
    styles
  } from "./style";
import { useAuth } from '../../contexts/AuthProvider';
import { auth } from '../../../firebase';
import { useNavigation } from '@react-navigation/native';

function Profile() {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const {currentUser} = useAuth();
    const navigation = useNavigation(); 

    async function handleLogout() {
        setError(""); // clean current error context
        try {
          await auth.signOut();
          navigation.navigate('Login');
        } catch {
          setError("Failed to log out");
        }
      }

    return (
        <SafeAreaView style={styles.container}>
                <Text style={styles.title}>Profile</Text>
                {error ? <Text style={styles.alert}>{error}</Text> : null}
                <View style={styles.formView}>
                        <Text style={styles.icon}>
                            {currentUser.email.charAt(0).toUpperCase()}
                        </Text>
                        <Text>{currentUser.email}</Text>

                    <View style={styles.row}>
                        <Button
                            disabled={loading}
                            mode="outlined"
                            onClick={handleLogout}
                        >
                        Logout
                        </Button>
                    </View>

                    <View style={styles.row}>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.link}>Back</Text>
                        </TouchableOpacity>
                    </View>

                </View>
        </SafeAreaView>
    )
}

export default Profile
