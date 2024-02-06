import React, { useContext } from "react";
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

const Event = ({ route }) => {
  const { events } = useContext(EventContext);
  const { id } = route.params;
  const currentEvent = events.find((e) => e.id === id);
  return (
    <SafeAreaView style={stylesEvent.container}>
      <View>
        <Text>{currentEvent.title}</Text>
        <Text>{moment(currentEvent.date).format("MMMM Do YYYY")}</Text>
        <Activities activity={currentEvent.value} />
        <Text>Summary: </Text>
      </View>
    </SafeAreaView>
  );
};

export default Event;
