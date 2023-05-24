import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "./components/IconButton";
import EntryInput from "./screens/EntryInput";
import EntryListing from "./screens/EntryListing";
import React from "react";
import { HEADER_COLOR } from "./config";
import { ADD_CUSTOMER_SCREEN_TITLE } from "./config";
import { MAIN_SCREEN_TITLE } from "./config";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: HEADER_COLOR,
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name={MAIN_SCREEN_TITLE}
          component={EntryListing}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                //For the list of icon name, visit https://icons.expo.fyi/
                name="add-circle"
                size={24}
                color="white"
                onPress={() => {
                  navigation.navigate(ADD_CUSTOMER_SCREEN_TITLE);
                }}
              />
            ),
          })}
        />
        <Stack.Screen name={ADD_CUSTOMER_SCREEN_TITLE} component={EntryInput} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
