import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native';
import { useAuth } from '../contexts/AuthProvider';

export default function Home({navigation}) {
    const {currentUser} = useAuth();

    return (
        <React.Fragment>
            {currentUser==null ?
                <React.Fragment>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text>Login</Text>
                        </TouchableOpacity>
                    </View>
                </React.Fragment>
            :
            <React.Fragment>
                <h1>Home</h1>
                <View>
                    <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Text>Profile</Text>
                    </TouchableOpacity>
                </View>
            </React.Fragment>
            }
        </React.Fragment>
    )
}
