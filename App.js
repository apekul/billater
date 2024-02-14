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
  const [events, setEvents] = useState(null);

  // Define a function to retrieve user and events data from AsyncStorage
  const retrieveData = async () => {
    try {
      // Retrieve user data
      const userValue = await AsyncStorage.getItem("user");
      if (userValue !== null) {
        console.log("User:", userValue);
        setUser(userValue);
      }

      // Retrieve events data
      const eventsValue = await AsyncStorage.getItem("events");
      if (eventsValue !== null) {
        setEvents(JSON.parse(eventsValue));
      } else setEvents([]);
    } catch (error) {
      // Error handling
      console.error("Error retrieving data:", error);
    }
  };

  // Define a function to store user data
  const storeUser = async (userData) => {
    try {
      await AsyncStorage.setItem("user", userData);
      // console.log("User data stored successfully");
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  // Define a function to store events data
  const storeEvents = async (eventsData) => {
    try {
      const jsonValue = JSON.stringify(eventsData);
      if (events !== null) {
        await AsyncStorage.setItem("events", jsonValue);
        // console.log("Events data stored successfully", jsonValue);
      }
    } catch (error) {
      console.error("Error storing events data:", error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []); // Empty dependency array ensures useEffect runs only once on mount
  // useEffect hook to store user data whenever it changes
  useEffect(() => {
    storeUser(user);
  }, [user]); // Run this effect whenever user changes

  // useEffect hook to store events data whenever it changes
  useEffect(() => {
    storeEvents(events);
  }, [events]); // Run this effect whenever events changes
  // useEffect hook to retrieve data on component mount

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
