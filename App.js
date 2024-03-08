import React, { useState, useEffect } from "react";
import "react-native-gesture-handler";
import Icon from "react-native-vector-icons/AntDesign";
import { StatusBar } from "react-native";
// Components
import CreateEvent from "./Components/CreateEvent";
import CreateActivity from "./Components/CreateActivity";
import CreateAcc from "./Components/CreateAcc";
import Home from "./Components/Home";
import Event from "./Components/Event";
import Loading from "./Components/Loading";

// Context
import { EventContext } from "./context";

// Navigation
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

// Storage
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
  const [isLoading, setIsLoading] = useState(true);
  const [currency, setCurrency] = useState("PLN");

  // Store Currency
  // const storeUser = async (userData) => {
  //   try {
  //     await AsyncStorage.setItem("currency", currency);
  //   } catch (error) {
  //     console.error("Error storing user data:", error);
  //   }
  // };

  // Define a function to retrieve user and events data from AsyncStorage
  const retrieveData = async () => {
    try {
      // Retrieve user data
      const userValue = await AsyncStorage.getItem("user");
      if (userValue !== null) {
        // console.log("User:", userValue);
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
    } finally {
      // Update loading state
      setIsLoading(false);
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

  // useEffect hook to store events data whenever it changes
  useEffect(() => {
    storeEvents(events);
  }, [events]); // Run this effect whenever events changes
  // useEffect hook to retrieve data on component mount

  return (
    <EventContext.Provider
      value={{ events, setEvents, user, setUser, currency }}
    >
      <StatusBar barStyle="white-content" backgroundColor="#273c75" />
      <NavigationContainer theme={MyTheme}>
        <Stack.Navigator>
          {isLoading ? (
            // Show a loading screen or indicator while retrieving user data
            // You can customize this according to your UI/UX design
            <Stack.Screen
              name="Loading"
              component={Loading}
              options={{ headerShown: false }}
            />
          ) : user ? (
            // If user data is available, navigate to the Home screen
            <Stack.Screen
              name="Home"
              component={Home}
              options={({ navigation }) => ({
                title: user ? "Hello, " + user : "Home",
                headerLeft: null,
                headerStyle: {
                  backgroundColor: "#273c75",
                  borderWidth: 1,
                  borderColor: "#273c75",
                  elevation: 0,
                },
                headerTintColor: "white",
                headerRight: () => (
                  <Icon
                    name="logout"
                    size={20}
                    color="white"
                    style={{ marginRight: 20 }}
                    onPress={() => {
                      setUser("");
                    }}
                  />
                ),
              })}
            />
          ) : (
            // If no user data is found, navigate to the authentication screen
            <Stack.Screen name="Login" component={CreateAcc} />
          )}

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
      </NavigationContainer>
    </EventContext.Provider>
  );
}
