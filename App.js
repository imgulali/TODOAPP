import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const [task, setTask] = useState("");
  const [taskItems, setTaskItems] = useState([]);


  useEffect(() => {
    loadTasks();
  }, []);

  const saveTasks = async (tasks) => {
    try {
      await AsyncStorage.setItem('@tasks', JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks:', error);
    }
  };

  const loadTasks = async () => {
    try {
      const storedTasks = await AsyncStorage.getItem('@tasks');
      if (storedTasks !== null) {
        setTaskItems(JSON.parse(storedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  };

  const addTask = () => {
    Keyboard.dismiss();
    const newTasks = [...taskItems, task];
    setTaskItems(newTasks);
    saveTasks(newTasks);
    setTask("");
  };

  const deleteTask = (index) => {
    const newTasks = [...taskItems];
    newTasks.splice(index, 1);
    setTaskItems(newTasks);
    saveTasks(newTasks);
  };

  return (
    <View style={styles.container}>
      {/* Today's Tasks */}
      <View style={styles.tasksWrapper}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>

        <View style={styles.items}>
          {/* Here will be the tasks */}
          {
            taskItems.map((item, index) => {
              return(
                <TouchableOpacity key={index} onPress={() => deleteTask(index)}>
                  <Tasks text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      {/* Adding a new note */}
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.writeTaskWrapper}
      >
        <TextInput
          style={styles.textInput}
          placeholder={"Write a task"}
          value={task}
          onChangeText={text => setTask(text)}
          placeholderTextColor={"#dadada"}
        />

        <TouchableOpacity onPress={() => addTask()}>
          <View style={styles.addWrapper}>
            <Text style={styles.addTask}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E8EAED",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingLeft: 20,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: "absolute",
    bottom: 60,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  textInput: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 280,
    backgroundColor: "#ffff",
    borderRadius: 60,
    borderColor: "#C0C0C0",
    borderWidth: 1,
    fontSize: 17,
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderColor: "#cacaca",
    borderWidth: 1,
    backgroundColor: "#ffff",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 60,
  },
  addText: {
    fontSize: 22,
  },
});
