import React from 'react'
import { TouchableOpacity, View, Text, Button } from 'react-native';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
    const {currentUser} = useAuth();
    const navigation = useNavigation(); 
    
    return (
        <React.Fragment>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text>Profile</Text>
                </TouchableOpacity>
            </View>
        </React.Fragment>
    )
}
