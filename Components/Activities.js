import React from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";

const Activities = ({ activity }) => {
  // value: {
  //   [user]: { balance: 0 },
  // },
  return (
    <View>
      <Text>Activities</Text>
      {Object.keys(activity).map((a, i) => {
        <Text>{a.balance}</Text>;
      })}
    </View>
  );
};

export default Activities;
