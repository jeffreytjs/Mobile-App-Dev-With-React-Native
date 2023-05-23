import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";

export default function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState([]);

  function handleInput(text) {
    setInput(text);
  }

  function addEntry() {
    setData([...data, input]);
    setInput("");
  }

  function deleteEntry(index) {
    const newData = [...data.slice(0, index), ...data.slice(index + 1)];
    setData(newData);
  }

  function renderEntries() {
    return data.map((entry, index) => {
      return (
        <View key={index} style={styles.entryContainer}>
          <Text style={styles.entryText}>
            {index + 1}. {entry}
          </Text>
          <Button onPress={() => deleteEntry(index)} title="Delete" />
        </View>
      );
    });
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Text>Todo Entry:</Text>
      <TextInput
        style={styles.textInput}
        value={input}
        onChangeText={handleInput}
      />
      <Button title="Add" onPress={addEntry} />
      <View>{renderEntries()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    borderWidth: 1,
    width: "90%",
    height: 40,
    padding: 5,
  },
  entryContainer: {
    flexDirection: "row",
  },
  entryText: {
    padding: 10,
  },
});
