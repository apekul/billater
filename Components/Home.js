import React, { useState, useContext, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import EventList from "./EventList";
import { stylesHome } from "../styles/style";
import { EventContext } from "../context";

const Home = ({ navigation }) => {
  const { events, setEvents, user, currency } = useContext(EventContext);
  // console.log(events[0].value[0].items);
  const [balance, setBalance] = useState({
    balance: { txt: "Total Balance", value: 0, color: "#898A8D" },
    owe: { txt: "you owe", value: 0, color: "#EF4F2B" },
    owes: { txt: "owes you", value: 0, color: "#24CE85" },
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
    const balanceValue = oweValue - owesValue;
    setBalance((prev) => ({
      balance: {
        ...prev.balance,
        value: balanceValue,
      },
      owe: { ...prev.owe, value: oweValue },
      owes: { ...prev.owes, value: owesValue },
    }));
  }, [events]);

  return (
    <SafeAreaView style={stylesHome.container}>
      <View style={stylesHome.list}>
        {Object.values(balance).map((v, i) => (
          <View key={i} style={{ justifyContent: "center" }}>
            <Text style={stylesHome.txt}>{v.txt}:</Text>
            <Text style={i === 0 ? stylesHome.txtBalance : stylesHome.txt}>
              {v.value} <Text style={{ fontSize: 12 }}>{currency}</Text>
            </Text>
          </View>
        ))}
      </View>
      <EventList navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;
