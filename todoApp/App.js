import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

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

  function renderEntry({ item, index }) {
    return (
      <View key={index} style={styles.entryContainer}>
        <Text style={styles.entryText}>
          {index + 1}. {item}
        </Text>
        <View style={styles.entryButton}>
          <Button
            onPress={() => {
              Alert.alert("Todo", "Do you want to delete?", [
                {
                  text: "Yes",
                  onPress: () => {
                    deleteEntry(index);
                  },
                },
                {
                  text: "No",
                },
              ]);
            }}
            title="Delete"
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
        placeholder="Enter todo entry"
        multiline={true}
        style={styles.textInput}
        value={input}
        onChangeText={handleInput}
      />
      <Button title="Add" onPress={addEntry} />
      <FlatList
        style={styles.scrollViewStyle}
        data={data}
        renderItem={renderEntry}
      />
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
    padding: 5,
  },
  entryButton: {
    flex: 1,
    justifyContent: "center",
  },
  entryContainer: {
    flexDirection: "row",
  },
  entryText: {
    padding: 10,
  },
  scrollViewStyle: {
    width: "80%",
    maxHeight: "60%",
  },
});
