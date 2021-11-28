import React from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList } from "react-native";

class Forum extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            question:{title:"My First question", text:"Hello, this is my first question", userName: "Hugo"},
            messages:[],
            answerInput:""
        };
    }
    render(){
        return(
        <View style={styles.maincontainer}>
            <View style={styles.questiontitle}>
                <Text style={styles.titletext}>{this.state.question.title}</Text>
            </View>
            <View style={styles.questioncontainer}>
                <Text style={styles.usertext}>{this.state.question.userName}</Text>
                <Text style ={styles.questiontext}>{this.state.question.text}</Text>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer:{
        marginTop:0,
        flex:1,
        backgroundColor:"#D1D1D1"
    },
    questiontitle:{
        backgroundColor: "#1A54A6",
        height:50,
        alignItems: 'center'
    },
    questioncontainer:{
        marginTop:5,
        marginBottom:5,
        textAlign: "justify"

    }, 
    titletext: {
        marginTop: 10,
        marginBottom:10,
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
      },
      usertext:{
          fontWeight: 'bold',
          fontSize:18,
      },
      questiontext:{
          fontSize:16
      }
})

export default Forum;