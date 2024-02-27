import React, { useContext } from "react";
import { Text, View, SafeAreaView } from "react-native";
import moment from "moment";
import { EventContext } from "../context";
import { stylesEvent } from "../styles/style";
import Activities from "./Activities";

const Event = ({ route, navigation }) => {
  const { events, currency } = useContext(EventContext);
  const { id } = route.params;
  const currentEvent = events.find((e) => e.id === id);

  // Sum total money spend on every events
  // const calculateTotalSum = () => {
  //   const totalSum = events.reduce((acc, event) => {
  //     event.value.forEach((val) => {
  //       acc += +val.total;
  //     });
  //     return acc;
  //   }, 0);

  //   return totalSum;
  // };
  const calculateTotalSum = () => {
    const totalSum = currentEvent.value.reduce((acc, curr) => {
      acc += +curr.total;
      return acc;
    }, 0);

    return totalSum;
  };

  // add edit func to event (change title, date)

  return (
    <SafeAreaView style={[stylesEvent.container]}>
      <View style={{ gap: 10, flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
              {currentEvent.title ? currentEvent.title : "No title"}
            </Text>
            <Text style={{ fontWeight: "bold" }}>
              {moment(currentEvent.date).format("MMMM Do YYYY")}
            </Text>
          </View>
          <Text style={{ paddingHorizontal: 16 }}>
            Total spend: {calculateTotalSum()}
            <Text style={{ fontSize: 12 }}> {currency}</Text>
          </Text>
        </View>
        <Activities currentEvent={currentEvent} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};
export default Event;
