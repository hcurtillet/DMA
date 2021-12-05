import React, { useEffect } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Button,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useAuth } from "../contexts/AuthProvider";
import { useNavigation } from "@react-navigation/native";
import { useCourses } from "../../firebase";
import { styles } from "./auth/style";
import { StyleSheet } from "react-native";

export default function Home() {
  const { currentUser } = useAuth();
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Text style={homeStyles.textHeader}>Profile</Text>
        </TouchableOpacity>
      ),
    });
  });
  const { data: courses } = useCourses();

  const Separator = () => <View style={styles.separator} />;

  function courseButton(course) {
    return (
      <View>
        <TouchableOpacity
          style={homeStyles.button}
          onPress={() => navigation.navigate("Home")} //Change so its to the forum
        >
          <Text>{course.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (courses === undefined) {
    return null;
  }

  return (
    <React.Fragment>
      <View style={homeStyles.container}>
        <Text style={styles.title}>Courses</Text>
        <SafeAreaView
          style={{
            flex: 1,
            paddingTop: 10,
            paddingBottom: 20,
          }}
        >
          <FlatList
            data={courses}
            renderItem={({ item }) => courseButton(item)}
          />
        </SafeAreaView>
      </View>
    </React.Fragment>
  );
}

const homeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    marginLeft: "10%",
    marginRight: "10%",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#3099f2",
    padding: 10,
    margin: 5,
  },
  buttonIcon: {
    width: 50,
    height: 50,
  },
  textHeader: {
    fontSize: 16,
    textAlign: "center",
  },
});
