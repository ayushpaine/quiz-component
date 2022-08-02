import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useState, useEffect } from "react";
import { db } from "./firebase/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import Quiz from "./screens/Quiz";

export default function App() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getQuestions = () => {
      onSnapshot(collection(db, "quesandans"), (snapshot) => {
        setQuestions(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
      });
    };
    getQuestions();
  }, []);

  return (
    <View style={styles.container}>
      <Quiz questions={questions} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
