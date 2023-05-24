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
    if (!input) {
      Alert.alert("Error", "Please enter a todo entry!");
      return;
    }

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
            title="Delete"
            onPress={() => {
              Alert.alert("Delete", `Are you sure you want to delete ${item}`, [
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
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.entryForm}>
        <TextInput
          placeholder="Enter todo entry"
          multiline={true}
          style={styles.textInput}
          value={input}
          onChangeText={handleInput}
        />
      </View>
      <View style={styles.entryFormButton}>
        <Button title="Add" onPress={addEntry} />
      </View>
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
    backgroundColor: "#e8e8e8",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
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
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#a4a4a4",
    margin: 5,

    backgroundColor: "white",
    elevation: 4,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  entryForm: {
    flexDirection: "row",
    margin: 20,
  },
  entryFormButton: {
    justifyContent: "center",
    marginLeft: 5,
  },
  entryText: {
    flex: 3,
    padding: 10,
  },
  scrollViewStyle: {
    width: "80%",
    maxHeight: "60%",
  },
});
