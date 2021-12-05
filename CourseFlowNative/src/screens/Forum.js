import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList, SafeAreaView, StatusBar } from "react-native";
import { getFirestore, collection, doc, getDocs, getDoc, where, query, setDoc } from "firebase/firestore/lite";
import useSWR from "swr";
import { useAuth } from "../contexts/AuthProvider";
import { database } from "../../firebase"
import { homeStyles } from "./Home";

function Forum({navigation, route}) {

    async function getQuestions() {
        const questionsCollection = doc(database, "Questions", idQuestion);
        const questionsSnapshot = await getDoc(questionsCollection);
        //const questionsList = questionsSnapshot.docs.map((doc) => doc.data());
        return questionsSnapshot.data();
    }

    function useQuestion() {
        return useSWR("Questions", getQuestions);
    }

    async function getMessages() {
        const messagesCollection = collection(database, "Messages");
        const messagesQuery = query(messagesCollection, where("questionId", "==", idQuestion));
        const messagesSnapshot = await getDocs(messagesQuery);
        const messagesList= messagesSnapshot.docs.map((doc) => {
            return doc.data();

        });
        messagesList.sort((a,b) =>{ //in order to sort the message list by date
            return a.date.seconds - b.date.seconds;
        })
        return messagesList;
    }

    function useMessages() {
        return useSWR("Messages", getMessages);
    }


    
    const question = route.params.question;
    const idQuestion = question.id.trim();
    const { currentUser, logout, updatePassword, updateEmail } = useAuth();
    const {data: messages} = useMessages();
    const [newAnswer, setNewAnswer] = useState('');

    function addAnswer(){
        const newAnswerObject = {
            text: newAnswer, 
            questionId: idQuestion, 
            date:{seconds: Date.now()/1000, nanoseconds: 0},
            userName: currentUser.email
        }
        updateAnswer(newAnswerObject);
        setNewAnswer("");
        navigation.navigate("Forum", {question:question});
    }

    function updateAnswer(newAnswerObject){
        const messagesCollection = collection(database, "Messages");
        setDoc(doc(messagesCollection), newAnswerObject);
    }
    
    function toDate(seconds) {
        const dateObject = new Date(seconds * 1000);
        return dateObject.toLocaleString();
    }

    function MessageRender(message){
        return(
            <View style={{alignItems:'center'}}>
                <View style={stylesmessage.maincontainer}>
                    <Text style={stylesmessage.usertext}>{message.userName}</Text>
                    <Text style={stylesmessage.questiontext}>{message.text}</Text>
                    <Text style={stylesmessage.datetext}>{toDate(message.date.seconds)}</Text>
                </View>
            </View>
            )
    }

    if(messages=== undefined || messages === null || messages.length === 0) {
      return ( <Text> This question is unavailable</Text>);
  }


  return (
    <SafeAreaView style={{ flex: 1, paddingTop:40 }}>
        <View style={homeStyles.container}>
            <Text style={homeStyles.title}>{question.title}</Text>
            <View style={styles.questioncontainer}>
                <Text style={styles.usertext}>{question.userName}</Text>
                <Text style={styles.questiontext}>{question.text}</Text>
                <Text style={styles.datetext}>{toDate(question.date.seconds)}</Text>
            </View>
        <TextInput multiline={true}
            numberOfLines={4}
            style={styles.textinput} 
            placeholder='Answer something...'
            value={newAnswer}
            onChangeText={(text) => setNewAnswer(text)}
            onSubmitEditing={() => {}}
        />
        <View style={styles.buttonview}>
        <Button
            onPress={() => addAnswer()}
            style={styles.button}
            title='Answer'
        />
        </View>
            <FlatList
            data={messages}
            renderItem={({item}) => MessageRender(item)}
            />
        </View>
    </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    questioncontainer: {
        marginBottom: 5,
        textAlign: "justify",
        backgroundColor: "white"

    },
    titletext: {
        fontSize: 20,
        textAlign: "center",
        margin: 15,
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

const stylesmessage = StyleSheet.create({
    maincontainer:{
        justifyContent:'center',
        marginTop:10,
        width: '90%',
        backgroundColor: "white"
    },
    usertext: {
        fontWeight: 'bold',
        fontSize: 18,
    },
    messagetext: {
        fontSize: 16,
        textAlign: "justify",
        marginHorizontal: 10
    },
    datetext: {
        fontSize: 14,
        textAlign: "right"
    }
})

export default Forum;