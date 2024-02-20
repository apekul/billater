import React from "react";
import { View, Text, TouchableOpacity, TouchableHighlight } from "react-native";
import { stylesSummary } from "../styles/style";

const EventSummary = ({ currentEvent }) => {
  const calculateTotalSum = () => {
    const totalSum = currentEvent.value.reduce((acc, curr) => {
      acc += +curr.total;
      return acc;
    }, 0);

    return totalSum;
  };
  return (
    <View style={{ marginVertical: 10, marginBottom: 50 }}>
      <Text style={stylesSummary.header}>Summary</Text>
      <View style={stylesSummary.container}>
        <View style={stylesSummary.group}>
          <Text style={stylesSummary.total}>Total:</Text>
          <Text style={stylesSummary.total}>${calculateTotalSum()}</Text>
        </View>
        <View style={stylesSummary.group}>
          <Text>Person</Text>
          <Text>$20</Text>
        </View>
      </View>
    </View>
  );
};

export default EventSummary;
