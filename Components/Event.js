import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import moment from "moment";
import { EventContext } from "../context";
import { stylesEvent } from "../styles/style";
import Activities from "./Activities";

const Event = ({ route, navigation }) => {
  const { events, setEvents } = useContext(EventContext);
  const { id } = route.params;
  const currentEvent = events.find((e) => e.id === id);
  //   {
  //     buyer: "John Wick",
  //     items: [
  //       {
  //         name: "Kebab",
  //         price: 20,
  //         receipient: "Micha Dzik",
  //       },
  //       {
  //         name: "Piwo",
  //         price: 30,
  //         receipient: "Jhon Doe",
  //       },
  //     ],
  //     total: 50,
  //   },

  // if current Event is updated then update to setEvents
  return (
    <SafeAreaView style={stylesEvent.container}>
      <View style={{ gap: 10 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View>
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {currentEvent.title ? currentEvent.title : "No title"}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              {moment(currentEvent.date).format("MMMM Do YYYY")}
            </Text>
          </View>
          <Text>Total spent: $30</Text>
        </View>
        <Activities currentEvent={currentEvent} navigation={navigation} />
        {/* <Text>Summary: </Text> */}
      </View>
    </SafeAreaView>
  );
};
export default Event;
