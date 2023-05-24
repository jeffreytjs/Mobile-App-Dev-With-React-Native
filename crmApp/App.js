import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "./components/IconButton";
import EntryInput from "./screens/EntryInput";
import EntryListing from "./screens/EntryListing";
import React from "react";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#229ED9",
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name="CRM App"
          component={EntryListing}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                //For the list of icon name, visit https://icons.expo.fyi/
                name="add-circle"
                size={24}
                color="white"
                onPress={() => {
                  navigation.navigate("Add Customer");
                }}
              />
            ),
          })}
        />
        <Stack.Screen name="Add Customer" component={EntryInput} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
