import { useState } from "react";
import { StyleSheet, Text, View, Button, TextInput } from "react-native";

export default function App() {
  const [goalText, setGoalText] = useState("");
  const [goalList, setGoalList] = useState([]);

  function handleGoalChange(text) {
    setGoalText(text);
  }

  function addGoal() {
    setGoalList((currGoalList) => [...currGoalList, goalText]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.viewContainer}>
        <TextInput
          placeholder="Your course goal"
          style={styles.textContainer}
          onChangeText={handleGoalChange}
        />
        <Button title="Add Goal" onPress={addGoal} />
      </View>
      <View style={styles.goalsContainer}>
        {goalList.map((goal, index) => {
          return (
          <View key={index} style={styles.goalItem}>
          <Text style={styles.goalText}>{goal}</Text>
          </View>
          )
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },

  viewContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },

  textContainer: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "70%",
    borderRadius: 5,
    marginRight: 8,
    padding: 8,
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem:{
    margin:8,
    padding:8,
    backgroundColor:'#5e0acc',
    borderRadius: 6
  },
  goalText:{
    color:'white'
  }
});
