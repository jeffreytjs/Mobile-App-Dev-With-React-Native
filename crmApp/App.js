import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import IconButton from "./components/IconButton";
import InputScreen from "./screens/InputScreen";
import ListingScreen from "./screens/ListingScreen";
import React from "react";
import config from "./config";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: config.HEADER_COLOR,
          },
          headerTintColor: "white",
        }}
      >
        <Stack.Screen
          name={config.MAIN_SCREEN_TITLE}
          component={ListingScreen}
          options={({ navigation }) => ({
            headerRight: () => (
              <IconButton
                //For the list of icon name, visit https://icons.expo.fyi/
                name="add-circle"
                size={24}
                color="white"
                onPress={() => {
                  navigation.navigate(config.ADD_CUSTOMER_SCREEN_TITLE);
                }}
              />
            ),
          })}
        />
        <Stack.Screen
          name={config.ADD_CUSTOMER_SCREEN_TITLE}
          component={InputScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
