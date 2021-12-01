import React from "react";
import { View, StyleSheet, Text} from "react-native";

class Message extends React.Component {
    toDate(seconds) {
        const dateObject = new Date(seconds * 1000);
        return dateObject.toLocaleString();
    }
    render(){
        const message = this.props.message;
        return(
            <View style={{alignItems:'center'}}>
                <View style={styles.maincontainer}>
                    <Text style={styles.usertext}>{message.userName}</Text>
                    <Text style={styles.questiontext}>{message.text}</Text>
                    <Text style={styles.datetext}>{this.toDate(message.date.seconds)}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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

export default Message;