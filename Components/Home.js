import React, { useState, useContext, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import EventList from "./EventList";
import { stylesHome } from "../styles/style";
import { EventContext } from "../context";

const Home = ({ navigation }) => {
  const { events, setEvents } = useContext(EventContext);

  const [balance, setBalance] = useState([
    { txt: "you owe", value: 0, color: "#EF4F2B" },
    { txt: "you are owed", value: 0, color: "#24CE85" },
    { txt: "balance", value: 0, color: "#898A8D" },
  ]);

  // function that update balance by current user payments

  return (
    <SafeAreaView style={stylesHome.container}>
      <View style={stylesHome.list}>
        {balance.map((v, i) => (
          <View key={i}>
            <Text style={[stylesHome.txt, { color: v.color }]}>{v.txt}:</Text>
            <Text style={[stylesHome.txt, { color: v.color }]}>${v.value}</Text>
          </View>
        ))}
      </View>
      <EventList navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;
