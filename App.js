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
  Image,
  RefreshControl,
  SectionList,
  KeyboardAvoidingView,
  ToastAndroid,
  ImageBackground
} from "react-native";
import { StatusBar } from "expo-status-bar";

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [goalText, setGoalText] = useState("");
  const [goalList, setGoalList] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const DATA = [
    {
      title: "Title1",
      data: ["1", "2", "3"],
    },
    {
      title: "Title2",
      data: ["3", "4", "5"],
    },
  ];

  function handleGoalChange(text) {
    setGoalText(text);
  }

  function addGoal() {
    setGoalList((currGoalList) => [
      ...currGoalList,
      { id: Math.random().toString(), text: goalText },
    ]);
    closeModal();
  }

  function deleteGoal(id) {
    setGoalList((currGoalList) => currGoalList.filter((item) => item.id != id));
  }

  function closeModal() {
    setShowModal(false);
  }

  function openModal() {
    setShowModal(true);
  }

  function handleRefresh() {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 2000);
  }

  function handleTestPress() {
    ToastAndroid.show("Text should be greater than 3", ToastAndroid.SHORT);
  }

  return (
    <>
      <StatusBar style="light" />
      <ImageBackground  source={{uri:"https://wallpaperaccess.com/full/4285634.jpg"}} style={styles.container}>
        <Button title="Add New Goal" color={"#729ad9"} onPress={openModal} />
        <Button title="Testingg" color={"#729ad9"} onPress={handleTestPress} />
        <Pressable
          onPressIn={() => {
            console.log("pressin");
          }}
          onPressOut={() => {
            console.log("pressout");
          }}
          onPress={() => {
            console.log("press");
          }}
          android_ripple={{ color: "red" }}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Pressable</Text>
        </Pressable>
        <Modal visible={showModal} animationType="slide">
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.viewContainer}
          >
            <Image
              style={styles.imageContainer}
              source={require("./assets/images/goal.png")}
            />
            <TextInput
              placeholder="Your course goal"
              style={styles.textContainer}
              onChangeText={handleGoalChange}
              clearButtonMode="while-editing"
            />
            <View style={styles.btnContainer}>
              <Button title="Add Goal" color={"#729ad9"} onPress={addGoal} />
              <Button title="Cancel" color={"red"} onPress={closeModal} />
            </View>
          </KeyboardAvoidingView>
        </Modal>
        <View style={styles.goalsContainer}>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={refresh}
                onRefresh={handleRefresh}
                title="Loading..."
                size="large"
                colors={["red"]}
              />
            }
            alwaysBounceVertical={false}
            data={goalList}
            renderItem={(itemData) => {
              return (
                <Pressable onPress={deleteGoal.bind(this, itemData.item.id)}>
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
        {/* to use when have nested data else use flat list */}
        <SectionList
          sections={DATA}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.header}>{title}</Text>
          )}
          renderItem={({ item }) => {
            return <Text style={styles.goalText}>{item}</Text>;
          }}
        />
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: "#2c25aa",
  },

  viewContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#311b6b",
    padding: 8,
  },

  btnContainer: {
    flexDirection: "row",
    width: "60%",
    marginTop: 6,
    justifyContent: "space-between",
  },

  imageContainer: {
    height: 150,
    width: 150,
    margin: 20,
  },

  textContainer: {
    borderWidth: 1,
    borderColor: "#cccccc",
    width: "100%",
    borderRadius: 5,
    padding: 16,
    backgroundColor: "#a7b7d1",
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
