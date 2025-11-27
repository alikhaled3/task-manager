import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Task } from '../app/index';


interface Props {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
}

export default function TaskItem({ task, onToggle, onDelete }: Props) {
  return (
    <View style={[styles.row, task.completed && styles.doneTaskBackGround]}>
      <TouchableOpacity
        onPress={onToggle}
        style={[styles.checkbox, task.completed && styles.checkboxChecked]}
      >
        <Text style={styles.checkboxText}>{task.completed ? "✓" : ""}</Text>
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Text
          style={[styles.text, task.completed && styles.textCompleted]}
          numberOfLines={1}
        >
          {task.text}
        </Text>
        <Text
          style={[styles.text, task.completed && styles.textCompleted]}
          numberOfLines={2}
        >
          {task.description}
        </Text>
        <Text
          style={[styles.text, task.completed && styles.textCompleted]}
          numberOfLines={1}
        >
          {task.date} {task.time}
        </Text>
      </View>

      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: "#f0f0f0ff",
    borderRadius: 10,
    marginBottom: 8,
    elevation: 1,
  },
  checkbox: {
    width: 28,
    height: 28,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: "#1eff00ff",
    borderColor: "#000000ff",
  },
  doneTaskBackGround: {
    backgroundColor: "#adffa0ff",

  },
  checkboxText: { color: "#fff", fontWeight: "700" },
  text: { flex: 1, fontSize: 16 },
  textCompleted: { textDecorationLine: "line-through", color: "#888" },
  deleteButton: {
    marginLeft: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 6,
  },
  deleteText: { color: "#e53935", fontWeight: "600" },
});
