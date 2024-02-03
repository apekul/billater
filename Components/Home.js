import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
import EventList from "./EventList";

const Home = ({ navigation, route }) => {
  const [balance, setBalance] = useState([
    { txt: "you owe", value: 20, color: "#EF4F2B" },
    { txt: "you are owed", value: 10, color: "#24CE85" },
    { txt: "balance", value: 0, color: "#898A8D" },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        {balance.map((v, i) => (
          <View key={i}>
            <Text style={[styles.txt, { color: v.color }]}>{v.txt}:</Text>
            <Text style={[styles.txt, { color: v.color }]}>${v.value}</Text>
          </View>
        ))}
      </View>
      <EventList />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  txt: {
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    gap: 20,
  },
  list: {
    backgroundColor: "#EFEFEF",
    borderRadius: 5,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Home;
