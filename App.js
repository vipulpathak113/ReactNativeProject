import { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Pressable,
  FlatList,
  Modal,
  Image
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {

  const [showModal, setShowModal] = useState(false);
  const [goalText, setGoalText] = useState("");
  const [goalList, setGoalList] = useState([]);

  function handleGoalChange(text) {
    setGoalText(text);
  }

  function addGoal() {
    setGoalList((currGoalList) => [...currGoalList, {id:Math.random().toString(),text:goalText}]);
    closeModal();
  }

  function deleteGoal(id){
    setGoalList((currGoalList=> currGoalList.filter(item=>item.id!=id)))
  }

  function closeModal(){
    setShowModal(false);
  }

  function openModal(){
    setShowModal(true);
  }

  return (
   <>
    <StatusBar style="light" />
    <View style={styles.container}>
      <Button title="Add New Goal" color={'#729ad9'} onPress={openModal} />
      <Modal visible={showModal} animationType="slide">
      <View style={styles.viewContainer}>
      <Image style={styles.imageContainer} source={require('./assets/images/goal.png')}/>
        <TextInput
          placeholder="Your course goal"
          style={styles.textContainer}
          onChangeText={handleGoalChange}
        />
        <View style={styles.btnContainer}>
        <Button title="Add Goal" color={'#729ad9'} onPress={addGoal} />
        <Button title="Cancel" color={"red"} onPress={closeModal} />
        </View>
      </View>
      </Modal>
      <View style={styles.goalsContainer}>
        <FlatList
          alwaysBounceVertical={false}
          data={goalList}
          renderItem={(itemData) => {
            return (
              <Pressable onPress={deleteGoal.bind(this,itemData.item.id)}>
                <View style={styles.goalItem}>
                  <Text style={styles.goalText}>{itemData.item.text}</Text>
                </View>
              </Pressable>
            );
          }}
          keyExtractor={(item, index) => {
            return item.id;
          }}
        />
      </View>
    </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor:"#2c25aa",
  },

  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor:'#311b6b',
    padding:8
  },

  btnContainer:{
    flexDirection: 'row',
    width:'60%',
    marginTop:6,
    justifyContent:"space-between"
  },

  imageContainer:{
    height:200,
    width:200,
    margin:20
  },

  textContainer: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    borderRadius: 5,
    padding: 16,
    backgroundColor:"#a7b7d1"
  },
  goalsContainer: {
    flex: 5,
  },
  goalItem: {
    margin: 8,
    padding: 8,
    backgroundColor: "#4641ba",
    borderRadius: 6,
  },
  goalText: {
    color: "white",
  },
});
