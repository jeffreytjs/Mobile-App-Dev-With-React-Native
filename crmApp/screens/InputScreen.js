import { StatusBar } from "expo-status-bar";
import React, { useRef } from "react";
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
import config from "../config";

export default function InputScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const nameTextInput = useRef(null);
  const phoneTextInput = useRef(null);
  const addressTextInput = useRef(null);

  function getValidateCustomer() {
    const nameTrimmed = name.trim();
    const phoneTrimmed = phone.trim();
    const addressTrimmed = address.trim();

    if (nameTrimmed === "") {
      Alert.alert(config.TITLE, "Please fill in the name");
      nameTextInput.current.focus();
      return null;
    }

    if (phoneTrimmed === "") {
      Alert.alert(config.TITLE, "Please fill in the phone number");
      phoneTextInput.current.focus();
      return null;
    }

    if (addressTrimmed === "") {
      Alert.alert(config.TITLE, "Please fill in the address");
      addressTextInput.current.focus();
      return null;
    }
    return [nameTrimmed, phoneTrimmed, addressTrimmed];
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
    const customer = getValidateCustomer();
    if (!customer) {
      return;
    }

    let entries = [];
    try {
      entries = await AsyncStorage.getItem(config.DATA_KEY);
    } catch (e) {}
    if (entries) {
      entries = JSON.parse(entries);
      entries = [...entries, [name, phone, address]];
    } else {
      entries = [[name, phone, address]];
    }
    entries = JSON.stringify(entries);
    try {
      await AsyncStorage.setItem(config.DATA_KEY, entries);
    } catch (error) {
      Alert.alert("Unable to save the entry. Please try again");
      return;
    }

    setName("");
    setPhone("");
    setAddress("");
    navigation.navigate("CRM App");
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
        onSubmitEditing={() => {
          phoneTextInput.current.focus();
        }}
        ref={nameTextInput}
        returnKeyType="next"
      />
      <Text style={styles.text}>Phone</Text>
      <TextInput
        style={styles.textInput}
        value={phone}
        onChangeText={handlePhone}
        multiline={true}
        placeholder="91234567"
        autoFocus={true}
        onSubmitEditing={() => {
          addressTextInput.current.focus();
        }}
        ref={phoneTextInput}
        returnKeyType="next"
      />
      <Text style={styles.text}>Address</Text>
      <TextInput
        style={styles.textInput}
        value={address}
        onChangeText={handleAddress}
        multiline={true}
        placeholder="123 Ang Mo kio"
        autoFocus={true}
        ref={addressTextInput}
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
