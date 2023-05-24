import { StatusBar } from "expo-status-bar";
import { React, useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DATA_KEY } from "../config";

export default function EntryInput({ navigation }) {
  const [input, setInput] = useState("");

  function handleInput(text) {
    setInput(text);
  }

  async function addEntry() {
    //ignore empty entries
    if (input === "") return;

    let entries = [];
    try {
      entries = await AsyncStorage.getItem(DATA_KEY);
    } catch (e) {}

    if (entries) {
      entries = JSON.parse(entries);
      entries = [...entries, input];
    } else {
      entries = [input];
    }
    entries = JSON.stringify(entries);

    try {
      await AsyncStorage.setItem(DATA_KEY, entries);
    } catch (error) {
      Alert.alert("Unable to save the entry. Please try again");
      return;
    }
    //console.log(entries);
    setInput("");
    navigation.navigate("EntryListing");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      <StatusBar style="auto" />
      <TextInput
        style={styles.textInput}
        value={input}
        onChangeText={handleInput}
        multiline={true}
        placeholder="Enter todo entry"
        autoFocus={true}
      />
      <Button title="Add" onPress={addEntry} />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "center",
    marginVertical: 40,
    marginHorizontal: 20,
  },
  textInput: {
    borderRadius: 6,
    backgroundColor: "white",
    fontSize: 20,
    padding: 5,
    marginBottom: 10,
    minHeight: 200,
  },
  entryButton: {
    flex: 1,
    justifyContent: "center",
  },
});
