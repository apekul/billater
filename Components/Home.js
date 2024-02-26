import React, { useState, useContext, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import EventList from "./EventList";
import { stylesHome } from "../styles/style";
import { EventContext } from "../context";

const Home = ({ navigation }) => {
  const { events, setEvents, user } = useContext(EventContext);

  const [balance, setBalance] = useState({
    owe: { txt: "you owe", value: 0, color: "#EF4F2B" },
    owes: { txt: "owes you", value: 0, color: "#24CE85" },
    balance: { txt: "balance", value: 0, color: "#898A8D" },
  });

  // Calculate total owe
  function sumPriceForRecipient() {
    let sum = 0;
    events.forEach((event) => {
      event.value.forEach((value) => {
        value.items.forEach((item) => {
          if (item.receipient === user && !item.settle) {
            sum += +item.price;
          }
        });
      });
    });
    return -sum;
  }

  // Calculate total owes
  const getTotalForBuyer = () => {
    let total = 0;
    events.forEach((event) => {
      event.value.forEach((value) => {
        if (value.buyer === user) {
          value.items.forEach((item) => {
            if (!item.settle) {
              total += +item.price;
            }
          });
        }
      });
    });
    return total;
  };

  useEffect(() => {
    const oweValue = sumPriceForRecipient();
    const owesValue = getTotalForBuyer();
    const balanceValue = owesValue + oweValue;
    setBalance((prev) => ({
      owe: { ...prev.owe, value: oweValue },
      owes: { ...prev.owes, value: owesValue },
      balance: {
        ...prev.balance,
        value: balanceValue,
      },
    }));
  }, [events]);

  return (
    <SafeAreaView style={stylesHome.container}>
      <View style={stylesHome.list}>
        {Object.values(balance).map((v, i) => (
          <View key={i}>
            <Text style={[stylesHome.txt, { color: v.color }]}>{v.txt}:</Text>
            <Text style={[stylesHome.txt, { color: v.color }]}>{v.value}$</Text>
          </View>
        ))}
      </View>
      <EventList navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;
