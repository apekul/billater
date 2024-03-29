import React, { useState, useContext, useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import EventList from "./EventList";
import { stylesHome } from "../styles/style";
import { EventContext } from "../context";

const Home = ({ navigation }) => {
  const { events, setEvents, user, currency } = useContext(EventContext);
  const [balance, setBalance] = useState({
    balance: { txt: "Total Balance", value: 0, color: "#898A8D", id: 1 },
    owe: { txt: "you owe", value: 0, color: "#EF4F2B", id: 2 },
    owes: { txt: "owes you", value: 0, color: "#5DB075", id: 3 },
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
    return sum.toFixed(2);
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
    return total.toFixed(2);
  };
  useEffect(() => {
    const oweValue = sumPriceForRecipient();
    const owesValue = getTotalForBuyer();
    const balanceValue = owesValue - oweValue;
    setBalance((prev) => ({
      balance: {
        ...prev.balance,
        value: balanceValue.toFixed(2),
      },
      owe: { ...prev.owe, value: oweValue },
      owes: { ...prev.owes, value: owesValue },
    }));
  }, [events]);

  return (
    <SafeAreaView style={stylesHome.container}>
      <View style={stylesHome.list}>
        {Object.values(balance).map((v, i) => (
          <View
            key={i}
            style={[
              {
                justifyContent: "center",
                flex: 1,
                paddingVertical: 3,
              },
              i !== 0 && {
                alignItems: "center",
                borderLeftWidth: 2,
                borderStyle: "dashed",
              },
            ]}
          >
            {i === 0 ? (
              <>
                <Text style={stylesHome.txtBalance}>
                  {v.value} <Text style={{ fontSize: 12 }}>{currency}</Text>
                </Text>
                <Text style={stylesHome.txt}>{v.txt}</Text>
              </>
            ) : (
              <>
                <Text style={{ fontWeight: "bold", color: v.color }}>
                  {v.txt}
                </Text>
                <Text style={[stylesHome.txt, { fontWeight: "bold" }]}>
                  {v.value} <Text style={{ fontSize: 12 }}>{currency}</Text>
                </Text>
              </>
            )}
          </View>
        ))}
      </View>
      <EventList navigation={navigation} />
    </SafeAreaView>
  );
};

export default Home;
