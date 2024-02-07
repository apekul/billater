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
  const [currentEvent, setCurrentEvent] = useState(
    events.find((e) => e.id === id)
  );
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
  return (
    <SafeAreaView style={stylesEvent.container}>
      <View style={{ gap: 10 }}>
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {currentEvent.title ? currentEvent.title : "No title"}
          </Text>
          <Text style={{ fontWeight: "bold" }}>
            {moment(currentEvent.date).format("MMMM Do YYYY")}
          </Text>
        </View>
        <Activities activity={currentEvent.value} navigation={navigation} />
        {/* <Text>Summary: </Text> */}
      </View>
    </SafeAreaView>
  );
};
export default Event;
