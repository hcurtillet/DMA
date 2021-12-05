import React from "react";
import { StyleSheet, View, Text, TextInput, Button, FlatList, SafeAreaView, StatusBar } from "react-native";
import { getFirestore, collection, doc, getDocs, getDoc, where, query, setDoc } from "firebase/firestore/lite";
import useSWR from "swr";
import { database } from "../../firebase"

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


    const idQuestion = useLocation().pathname.replace("/question/","");
    const { currentUser, logout, updatePassword, updateEmail } = useAuth();
    const {data: questions} = useQuestion();
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
                    <Text style={stylesmessage.datetext}>{this.toDate(message.date.seconds)}</Text>
                </View>
            </View>
        )
    }
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
                        data={messages}
                        renderItem={({item}) => MessageRender(item)}
                    />
                </View>
            </SafeAreaView>
        );
    
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

const stylesmessage = StyleSheet.create({
    maincontainer:{
        justifyContent:'center',
        marginTop:10,
        width: '90%',
        backgroundColor: "#AAAA"
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