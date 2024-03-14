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
            backgroundColor: "#4a69bd",
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Text style={[stylesEvent.txtLight, { fontSize: 20 }]}>
              {currentEvent.title ? currentEvent.title : "No title"}
            </Text>
            <Text style={stylesEvent.txtLight}>
              {moment(currentEvent.date).format("MMMM Do YYYY")}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Text style={[stylesEvent.txtLight, { fontSize: 20 }]}>
              {calculateTotalSum()} {currency}
            </Text>
            <Text style={[stylesEvent.txtLight]}>Total money spend</Text>
          </View>
        </View>
        <Activities currentEvent={currentEvent} navigation={navigation} />
      </View>
    </SafeAreaView>
  );
};
export default Event;
