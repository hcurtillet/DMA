import React from 'react'
import { TouchableOpacity, View, Text } from 'react-native';

export default function Home({navigation}) {
    return (
        <div>
            <h1>Home</h1>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                <Text>Profile</Text>
                </TouchableOpacity>
            </View>
        </div>
    )
}
