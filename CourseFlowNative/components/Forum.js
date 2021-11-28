import React from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList, SafeAreaView, StatusBar } from "react-native";
import Message from "./Message";

class Forum extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            question: { title: "My First question", text: "Hello, this is my first question. I'll write something a bit long in order to check that everything is okej when I display it!", userName: "Hugo", date: { seconds: 12345 } },
            messages: [{text: "This is a message", userName: "Hugo",date: { seconds: 12345 } },
            {text: "This is a message", userName: "Hugo",date: { seconds: 12345 }},
            {text: "This is a message", userName: "Hugo",date: { seconds: 12345 }},
            {text: "This is a message", userName: "Hugo",date: { seconds: 12345 }},
            {text: "This is a message", userName: "Hugo",date: { seconds: 12345 }},
            {text: "This is a message", userName: "Hugo",date: { seconds: 12345 }},
            {text: "This is a message", userName: "Hugo",date: { seconds: 12345 }},
            {text: "This is a message", userName: "Hugo",date: { seconds: 12345 }},
            {text: "This is a message", userName: "Hugo",date: { seconds: 12345 }},
            {text: "This is a message", userName: "Hugo",date: { seconds: 12345 }},
            {text: "This is a message", userName: "Hugo",date: { seconds: 12345 }},
            {text: "This is a message", userName: "Hugo",date: { seconds: 12345 }},
            {text: "This is a message", userName: "Hugo",date: { seconds: 12345 }}  ],
            answerInput: ""
        };
    }
    toDate(seconds) {
        const dateObject = new Date(seconds * 1000);
        return dateObject.toLocaleString();
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, paddingTop:40 }}>
                <View style={styles.maincontainer}>
                    <View style={styles.questiontitle}>
                        <Text style={styles.titletext}>{this.state.question.title}</Text>
                    </View>
                    <View style={styles.questioncontainer}>
                        <Text style={styles.usertext}>{this.state.question.userName}</Text>
                        <Text style={styles.questiontext}>{this.state.question.text}</Text>
                        <Text style={styles.datetext}>{this.toDate(this.state.question.date.seconds)}</Text>
                    </View>
                    <TextInput multiline={true}
                    numberOfLines={4}
                    style={styles.textinput} 
                    placeholder='Answer something...'
                    onChangeText={(text) => this.setState({answerInput: text})}
                    onSubmitEditing={() => {}}  
                    />
                    <View style={styles.buttonview}>
                        <Button
                            style={styles.button}
                            title='Answer'
                        />
                    </View>
                    <FlatList
                        data={this.state.messages}
                        renderItem={({item}) => <Message message={item}/>}
                    />
                </View>
            </SafeAreaView>
        );
    }
}

const styles = StyleSheet.create({
    maincontainer: {
        marginTop: 0,
        flex: 1,
        backgroundColor: "#D1D1D1"
    },
    questiontitle: {
        backgroundColor: "#1A54A6",
        height: 50,
        alignItems: 'center'
    },
    questioncontainer: {
        marginBottom: 5,
        textAlign: "justify",
        backgroundColor: "#888888"

    },
    titletext: {
        marginTop: 10,
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 20,
        flex: 1,
        flexWrap: 'wrap',
        paddingRight: 5
    },
    usertext: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    questiontext: {
        fontSize: 16,
        textAlign: "justify",
        marginHorizontal: 10
    },
    datetext: {
        fontSize: 14,
        textAlign: "right"
    },
    textinput: {
        textAlignVertical:'top',
        marginLeft: 20,
        marginRight: 20,
        borderColor: '#888888',
        borderWidth: 1,
        paddingLeft: 5,
        marginBottom:5,
        maxHeight:300
    },
    buttonview: {
        alignItems:'center',
    },
    button: {
        marginLeft:20,
        marginRight:20,
        marginTop:5,
        color: "#F5F5F5",
        backgroundColor: "red"
    }
})

export default Forum;