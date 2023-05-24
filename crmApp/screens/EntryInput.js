import { StatusBar } from "expo-status-bar";
import React from "react";
import { useState } from "react";
import {
  Alert,
  Button,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DATA_KEY } from "../config";

export default function EntryInput({ navigation }) {
  const [input, setInput] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function handleInput(text) {
    setInput(text);
  }
  function handleName(text) {
    setName(text);
  }
  function handlePhone(text) {
    setPhone(text);
  }
  function handleAddress(text) {
    setAddress(text);
  }

  async function addEntry() {
    //ignore empty entries
    if (name === "") return;

    let entries = [];
    try {
      entries = await AsyncStorage.getItem(DATA_KEY);
    } catch (e) {}

    if (entries) {
      entries = JSON.parse(entries);
      entries = [...entries, [name, phone, address]];
    } else {
      entries = [[name, phone, address]];
    }
    entries = JSON.stringify(entries);

    try {
      await AsyncStorage.setItem(DATA_KEY, entries);
    } catch (error) {
      Alert.alert("Unable to save the entry. Please try again");
      return;
    }
    console.log(entries);
    setInput("");
    setName("");
    setPhone("");
    setAddress("");
    navigation.navigate("Customers");
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : null}
      style={styles.container}
    >
      <StatusBar style="light" />
      <Text style={styles.text}>Name</Text>
      <TextInput
        style={styles.textInput}
        value={name}
        onChangeText={handleName}
        multiline={true}
        placeholder="Joe Doe"
        autoFocus={true}
      />
      <Text style={styles.text}>Phone</Text>
      <TextInput
        style={styles.textInput}
        value={phone}
        onChangeText={handlePhone}
        multiline={true}
        placeholder="91234567"
        autoFocus={true}
      />
      <Text style={styles.text}>Address</Text>
      <TextInput
        style={styles.textInput}
        value={address}
        onChangeText={handleAddress}
        multiline={true}
        placeholder="123 Ang Mo kio"
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
  text: {
    padding: 3,
  },
  textInput: {
    borderRadius: 6,
    backgroundColor: "white",
    fontSize: 15,
    padding: 5,
    marginBottom: 10,
  },
  entryButton: {
    flex: 1,
    justifyContent: "center",
  },
});
