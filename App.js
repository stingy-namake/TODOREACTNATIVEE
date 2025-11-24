import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

const StartScreen = ({ onEnter }) => {
  return (
    <View style={styles.welcomeContainer}>
      <Text style={styles.welcomeTitle}>This is my super awesome ToDoApp</Text>
      <Text style={styles.welcomeSubtitle}>ARE YOU READY?? DON'T HOLD YOUR BREATH!!</Text>
      <TouchableOpacity style={styles.enterButton} onPress={onEnter}>
        <Text style={styles.enterButtonText}>GO!!</Text>
      </TouchableOpacity>
    </View>
  );
};

const TodoApp = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddTask = () => {
    if (task) {
      if (editIndex !== -1) {
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = task;
        setTasks(updatedTasks);
        setEditIndex(-1);
      } else {
        setTasks([...tasks, task]);
      }
      setTask("");
    }
  };

  const handleEditTask = (index) => {
    const taskToEdit = tasks[index];
    setTask(taskToEdit);
    setEditIndex(index);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.task}>
      <Text style={styles.itemList}>{item + " "}</Text>
      <View style={styles.taskButtons}>
        <TouchableOpacity onPress={() => handleEditTask(index)}>
          <Text style={styles.editButton}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleDeleteTask(index)}>
          <Text style={styles.deleteButton}>Del</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.todoContent}>
        <TextInput
          style={styles.input}
          placeholder="Task..."
          value={task}
          onChangeText={(text) => setTask(text)}
        />

        <TouchableOpacity
          style={[
            styles.addButton,
            { backgroundColor: editIndex !== -1 ? 'blue' : 'red' }
          ]}
          onPress={handleAddTask}
        >
          <Text style={styles.addButtonText}>
            {editIndex !== -1 ? "Update Task" : "Add Task"}
          </Text>
        </TouchableOpacity>

        <FlatList
          data={tasks}
          renderItem={renderItem}
          keyExtractor={(_item, index) => index.toString()}
          style={styles.flatList}
        />
      </View>
    </View>
  );
};

const App = () => {
  const [showTodoApp, setShowTodoApp] = useState(false);

  if (!showTodoApp) {
    return <StartScreen onEnter={() => setShowTodoApp(true)} />;
  }

  return <TodoApp />;
};

const styles = StyleSheet.create({
  welcomeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textAlign: "center",
  },
  welcomeSubtitle: {
    fontSize: 18,
    color: "#ccc",
    marginBottom: 40,
    textAlign: "center",
  },
  enterButton: {
    backgroundColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  enterButtonText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  todoContent: {
    width: "80%",
    maxWidth: 400,
    alignItems: "center",
  },
  input: {
    borderWidth: 3,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 18,
    color: "#ccc",
    marginVertical: 20,
    width: "100%",
  },
  addButton: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    width: "100%",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18,
  },
  task: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    fontSize: 18,
    width: "100%",
  },
  itemList: {
    fontSize: 19,
    color: "white"
  },
  taskButtons: {
    flexDirection: "row",
  },
  editButton: {
    backgroundColor: "blue",
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 8,
    marginRight: 10,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 5,
    padding: 5,
    paddingHorizontal: 8,
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
  },
  flatList: {
    width: "100%",
  },
});

export default App;