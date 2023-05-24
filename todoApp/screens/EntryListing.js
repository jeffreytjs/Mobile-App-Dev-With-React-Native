import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { React, useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { DATA_KEY } from "../config";

function EntryListing() {
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      readData();
    }
  }, [isFocused]);

  async function saveData(updatedData) {
    const entries = JSON.stringify(updatedData);

    try {
      await AsyncStorage.setItem(DATA_KEY, entries);
    } catch (error) {
      Alert.alert("Unable to save the entry. Please try again");
    }
  }

  function deleteEntry(index) {
    const newData = [...data.slice(0, index), ...data.slice(index + 1)];

    setData(newData);
    saveData(newData);
  }

  async function readData() {
    let entries = [];

    try {
      entries = await AsyncStorage.getItem(DATA_KEY);
      entries = JSON.parse(entries);
    } catch (error) {}

    setData(entries);
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
              if (Platform.OS == "ios") {
                Alert.alert("Todo", `Do you want to delete ${item}?`, [
                  {
                    text: "Ok",
                    onPress: () => {
                      deleteEntry(index);
                    },
                  },
                  { text: "Cancel", style: "cancel" },
                ]);
              } else {
                Alert.alert("Todo", `Do you want to delete ${item}?`, [
                  {
                    text: "Yes",
                    onPress: () => {
                      deleteEntry(index);
                    },
                  },
                  { text: "No" },
                ]);
              }
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        style={styles.scrollViewStyle}
        data={data}
        renderItem={renderEntry}
      />
    </View>
  );
}
export default EntryListing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
  },
  textInput: {
    borderWidth: 1,
    width: "90%",
    padding: 5,
    borderRadius: 5,
  },
  entryText: {
    flex: 3,
  },
  entryButton: {
    flex: 1,
    justifyContent: "center",
  },
  entryForm: {
    flexDirection: "row",
    margin: 20,
  },
  entryFormButton: {
    justifyContent: "center",
    marginLeft: 5,
  },
  entryContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#a8a8a8",
    margin: 5,
    padding: 5,

    backgroundColor: "white",
    elevation: 8,

    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    shadowOpacity: 0.25,
  },
  scrollViewStyle: {
    width: "80%",
    maxHeight: "90%",
  },
});
