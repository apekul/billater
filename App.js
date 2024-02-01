import React from "react";
import CreateAcc from "./Components/CreateAcc";
import Home from "./Components/Home";
import Event from "./Components/Event";
import { Button, StyleSheet } from "react-native";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function App() {
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={CreateAcc} />
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ route, navigation }) => ({
            title:
              route.params && route.params.name
                ? "Logged as " + route.params.name
                : "Home",
            headerLeft: null,
            headerRight: () => (
              <Button
                style={styles.btn}
                onPress={() => {
                  // Perform logout action here
                  // setName("");
                  navigation.navigate("Login");
                }}
                title="Log Out"
                // color="red"
              />
            ),
          })}
        />
        <Stack.Screen name="Event" component={Event} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  btn: {
    margin: 20,
  },
});
