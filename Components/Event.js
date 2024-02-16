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
  const { events } = useContext(EventContext);
  const { id } = route.params;
  const currentEvent = events.find((e) => e.id === id);

  const calculateTotalSum = () => {
    const totalSum = events.reduce((acc, event) => {
      event.value.forEach((val) => {
        acc += +val.total;
      });
      return acc;
    }, 0);

    return totalSum;
  };

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
          <Text>Total spend: ${calculateTotalSum()}</Text>
        </View>
        <Activities currentEvent={currentEvent} navigation={navigation} />
        {/* <Text>Summary: </Text> */}
      </View>
    </SafeAreaView>
  );
};
export default Event;
