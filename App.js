import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import CreateAcc from "./Components/CreateAcc";
import Home from "./Components/Home";
import Event from "./Components/Event";
import CreateEvent from "./Components/CreateEvent";
import Icon from "react-native-vector-icons/AntDesign";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { EventContext } from "./context";
import CreateActivity from "./Components/CreateActivity";

import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function App() {
  const [user, setUser] = useState("");
  const [events, setEvents] = useState([]);

  const retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem("user");
      if (value !== null) {
        console.log("Retrieved data:", value);
      } else {
        console.log("No data found for the key!");
      }
    } catch (error) {
      console.error("Error retrieving data:", error);
    }
  };
  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem("user", user);
        console.log("Data saved successfully!");
      } catch (error) {
        console.error("Error saving data:", error);
      }
    };
    saveData();
  }, [user]);
  retrieveData();
  return (
    <NavigationContainer theme={MyTheme}>
      <EventContext.Provider value={{ events, setEvents, user, setUser }}>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={CreateAcc} />
          <Stack.Screen
            name="Home"
            component={Home}
            options={({ route, navigation }) => ({
              title: user ? "Logged as " + user : "Home",
              headerLeft: null,
              headerRight: () => (
                <Icon
                  name="logout"
                  size={20}
                  color="black"
                  style={{ marginRight: 20 }}
                  onPress={() => {
                    // Perform logout action here
                    // setName("");
                    navigation.navigate("Login");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="Event"
            component={Event}
            options={({ route, navigation }) => ({
              title: "Event",
              // title: events.find((event) => event.id === route.params.id).title,
              headerLeft: () => (
                <Icon
                  name="arrowleft"
                  size={23}
                  color="black"
                  style={{ marginLeft: 15, marginRight: 15 }}
                  onPress={() => {
                    navigation.navigate("Home");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen name="CreateEvent" component={CreateEvent} />
          <Stack.Screen name="CreateActivity" component={CreateActivity} />
        </Stack.Navigator>
      </EventContext.Provider>
    </NavigationContainer>
  );
}
