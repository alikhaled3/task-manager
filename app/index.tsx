import TaskItem from "@/components/taskItem";
import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Keyboard,
  Image,
  Modal,
  Platform,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import DateTimePicker from "@react-native-community/datetimepicker";

export interface Task {
  id: string;
  text: string;
  date: string;
  time: string;
  description: string;
  completed: boolean;
}

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [taskDate, setTaskDate] = useState(new Date());
  const [taskTime, setTaskTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  
  const showMessage = (msg: string) => {
    Alert.alert(msg);
  };

  const addTask = () => {
    const trimmed = text.trim();
    if (!trimmed) {
    showMessage("Task Name Requird!");
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      text: trimmed,
      date: taskDate.toLocaleDateString(),
      time: taskTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      description,
      completed: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setText("");
    setDescription("");
    setTaskDate(new Date());
    setTaskTime(new Date());
    setModalVisible(false);
    Keyboard.dismiss();
    showMessage("Task added successfully!");
  };

  const toggleComplete = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
    showMessage("Task deleted successfully!");
  };

  return (
    <LinearGradient
      colors={["#fff3c6ff", "#ffffffff"]}
      style={styles.container}
    >
      <View style={styles.headerFormat}>
        {/* <Image source={listLogo} style={styles.image} /> */}
        <View>
          <Text style={styles.header}>Task Manager</Text>
          <Text style={styles.paragraph}>
            {new Date().toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.addButtonText}> + </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabsContainer}>
        <View style={styles.tab}>
          <Text style={styles.tabNumber}>{tasks.length}</Text>
          <Text style={styles.tabLabel}>Total</Text>
        </View>
        <View style={styles.tab}>
          <Text style={styles.tabNumber}>
            {tasks.filter((t) => t.completed).length}
          </Text>
          <Text style={styles.tabLabel}>Done</Text>
        </View>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TaskItem
            task={item}
            onToggle={() => toggleComplete(item.id)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
        ListEmptyComponent={() => (
          <View style={styles.empty}>
            <Text style={styles.emptyText}>No tasks yet — add one above!</Text>
          </View>
        )}
      />

      {/* Modal */}
      {/* Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalHeader}>Add New Task</Text>

            {/* Task Name */}
            <TextInput
              style={styles.input}
              placeholder="Task Name"
              placeholderTextColor="#888"
              value={text}
              onChangeText={setText}
            />

            {/* Description */}
            <TextInput
              style={styles.input}
              placeholder="Description"
              placeholderTextColor="#888"
              value={description}
              onChangeText={setDescription}
            />

            {/* Date Picker */}
            <TouchableOpacity
              onPress={() => setShowDatePicker(true)}
              style={styles.input}
            >
              <Text>{taskDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={taskDate}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  setShowDatePicker(Platform.OS === "ios");
                  if (selectedDate) setTaskDate(selectedDate);
                }}
              />
            )}

            {/* Time Picker */}
            <TouchableOpacity
              onPress={() => setShowTimePicker(true)}
              style={styles.input}
            >
              <Text>
                {taskTime.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            </TouchableOpacity>
            {showTimePicker && (
              <DateTimePicker
                value={taskTime}
                mode="time"
                display="default"
                onChange={(event, selectedTime) => {
                  setShowTimePicker(Platform.OS === "ios");
                  if (selectedTime) setTaskTime(selectedTime);
                }}
              />
            )}

            {/* Buttons */}
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity style={styles.modalButton} onPress={addTask}>
                <Text style={styles.modalButtonText}>Add</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, { backgroundColor: "#ccc" }]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 24 },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 16,
    paddingVertical: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  tab: { alignItems: "center" },
  tabNumber: { fontSize: 20, fontWeight: "700" },
  tabLabel: { fontSize: 14, color: "#666" },
  header: { fontSize: 26, fontWeight: "700", marginTop: 20 },
  paragraph: { fontSize: 15, fontWeight: "700", marginBottom: 12 },
  headerFormat: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: { marginTop: 8, marginRight: 8, width: 50, height: 50 },
  addButton: { paddingVertical: 10, paddingHorizontal: 14, borderRadius: 8 },
  addButtonText: {
    color: "#ffffffff",
    backgroundColor: "#000000ff",
    padding: 1,
    borderRadius: 50,
    fontWeight: "600",
    textAlign: "left",
    fontSize: 30,
  },
  empty: { marginTop: 40, alignItems: "center" },
  emptyText: { color: "#666" },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginVertical: 5,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    padding: 16,
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },
  modalHeader: { fontSize: 20, fontWeight: "700", marginBottom: 12 },
  modalButton: {
    flex: 1,
    backgroundColor: "#ffe176",
    padding: 12,
    borderRadius: 8,
    margin: 5,
    alignItems: "center",
  },
  modalButtonText: { fontWeight: "700", fontSize: 16 },
});
