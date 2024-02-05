import React, { useState } from "react";
import "react-native-gesture-handler";
import CreateAcc from "./Components/CreateAcc";
import Home from "./Components/Home";
import Event from "./Components/Event";
import CreateEvent from "./Components/CreateEvent";
import Icon from "react-native-vector-icons/AntDesign";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { EventContext } from "./context";

const Stack = createStackNavigator();

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white",
  },
};

export default function App() {
  const [events, setEvents] = useState([]);

  return (
    <NavigationContainer theme={MyTheme}>
      <EventContext.Provider value={{ events, setEvents }}>
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
          <Stack.Screen name="Event" component={Event} />
          <Stack.Screen name="CreateEvent" component={CreateEvent} />
        </Stack.Navigator>
      </EventContext.Provider>
    </NavigationContainer>
  );
}
