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

  return (
    <View style={styles.container}>
      <Text>Todo Entry:</Text>
      <TextInput
        style={styles.textInput}
        value={input}
        onChangeText={handleInput}
      />
      <Button title="Add" onPress={addEntry} />
      <View>
        <Text>{JSON.stringify(data)}</Text>
      </View>
      <StatusBar style="auto" />
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
});
