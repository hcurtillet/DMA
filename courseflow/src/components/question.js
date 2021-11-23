import React from 'react';
import { StyleSheet, Text, View, TextInput, Button, FlatList, ActivityIndicatorComponent, ActivityIndicator } from 'react-native';

class question extends React.Component{

    constructor(quesion, user, date, answers){
        this.question = quesion;
        this.user = user;
        this.date = date;
        this.answers = answers;
    }
    render(){
        return(
            <View>
                
                <text>{this.question}</text>
            </View>
        )
    }
}