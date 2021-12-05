import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { database } from "../../firebase"
import { collection, getDocs, where, query } from "firebase/firestore/lite";
import useSWR from "swr";
import {
  TouchableOpacity,
  View,
  Text,
  Button,
  FlatList,
  SafeAreaView,
} from "react-native";
import { styles } from "./auth/style";
import { StyleSheet } from "react-native";

export default function QuestionsList({ navigation, route }) {
    async function getQuestions() {
        
        
        let questionsCollection = collection(database, "Questions");
        let questionsQuery = query(questionsCollection, where("courseId", "==", courseID));
        const snapshot = await getDocs(questionsQuery);
        const questions = snapshot.docs.map((doc) => doc.data());
        questions.sort((a,b) =>{ //in order to sort the message list by date
            return a.date.seconds - b.date.seconds;
        })
        return questions;
    }

    function useQuestions() {
        return useSWR("Questions", getQuestions);
    }

    function toDate(timestamp) {
      let date = new Date(timestamp*1000);
      return date.toLocaleString();
    }
    
    function goToQuestion(question) {
      navigate("/question/"+question.id.trim());
    }

    function renderQuestion(question) {
    return (
      <TouchableOpacity style={questionsStyles.button} onPress={() => navigation.navigate("Home")}>
        <Text style={questionsStyles.questionTitle}>{question.title}</Text>
        <Text style={questionsStyles.questionUsername}>{question.userName}</Text>
        <Text style={questionsStyles.timestamp}>{toDate(question.date.seconds)}</Text>
      </TouchableOpacity>
    );
  }

    const navigate = useNavigation();
    const courseID = route.params.courseID;
    const {data: questions} = useQuestions();
    console.log(questions);
    console.log("COURSE ID = \"" + courseID + "\"");
    
    if(questions=== undefined || questions === null || questions.length === 0) {
      return ( <Text> No question has been asked yet !</Text>);
    }

    return (
    <React.Fragment>
      <View style={questionsStyles.container}>
        <Text style={styles.title}>Questions</Text>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: 10,
            paddingBottom: 20,
          }}
        >
          <FlatList
            data={questions}
            renderItem={({ item }) => renderQuestion(item)}
          />
        </SafeAreaView>
      </View>
    </React.Fragment>


    );
};


const questionsStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginLeft: "10%",
    marginRight: "10%",
  },
  button: {
    justifyContent: "center",
    alignItems: "stretch",
    backgroundColor: "#3099f2",
    padding: 5,
    margin: 5,
  },
  questionTitle: {
    alignSelf: "stretch",
    textAlign: "left",
    fontSize: 16,
  },
  timestamp: {
    textAlign: "right",
    alignSelf: "flex-end",
    fontSize: 10,
    opacity:0.8
  },
  questionUsername: {
    alignSelf: "flex-start",
    textAlign: "left",
    fontSize: 10,
  },
});