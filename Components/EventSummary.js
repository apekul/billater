import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { stylesSummary } from "../styles/style";
import { EventContext } from "../context";

const EventSummary = ({ currentEvent }) => {
  const { currency } = useContext(EventContext);
  const [selectedBuyer, setSelectedBuyer] = useState("");

  const WhoOwesWho = () => {
    let summary = {};
    let history = {};

    currentEvent.value.forEach((value) => {
      value.items.forEach((item) => {
        if (value.buyer === item.receipient) {
          return; // Skip this iteration if the buyer is the same as the recipient
        }

        let key1 = `${item.receipient} owes ${value.buyer}`;
        let key2 = `${value.buyer} owes ${item.receipient}`;

        if (!history[value.buyer]) {
          history[value.buyer] = [];
        }

        history[value.buyer].push({
          transaction: `Paid ${item.price} ${currency} for ${item.name} ${item.receipient}`,
          settle: item.settle,
        });

        if (!summary[key2]) {
          if (summary[key1]) {
            summary[key1] = {
              amount: summary[key1]
                ? summary[key1].amount + parseFloat(item.price)
                : parseFloat(item.price),
              settle: item.settle,
            };
          } else {
            summary[key1] = {
              amount: parseFloat(item.price),
              settle: item.settle,
            };
          }
        } else {
          summary[key2].amount -= parseFloat(item.price);

          if (summary[key2].amount <= 0) {
            delete summary[key2];
          }
        }
      });
    });

    return { summary, history };
  };
  const { summary, history } = WhoOwesWho();
  return (
    <View
      style={{
        marginVertical: 10,
        marginBottom: 60,
        paddingHorizontal: 16,
        gap: 10,
      }}
    >
      <View>
        {Object.entries(summary).map(([key, value], index) => (
          <Text
            key={index}
            style={{
              backgroundColor: value.settle ? "#2ecc71" : "transparent",
            }}
          >
            {`${key}: ${value.amount} ${currency}`}
          </Text>
        ))}
      </View>
      <View style={stylesSummary.container}>
        <View style={stylesSummary.group}>
          <Text style={stylesSummary.total}>Transactions</Text>
        </View>
        {Object.entries(history).map(([buyer, transactions], index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              setSelectedBuyer(selectedBuyer === buyer ? null : buyer)
            }
            style={{
              flexDirection: "column",
              marginBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            <Text style={{ fontWeight: "bold", fontSize: 16 }}>
              {buyer} spend{" "}
              {transactions.reduce(
                (total, item) =>
                  total + parseFloat(item.transaction.split(" ")[1]),
                0
              )}{" "}
              {currency} ({transactions.length} transactions)
            </Text>
            {buyer === selectedBuyer &&
              transactions.map((item, index) => (
                <Text
                  key={index}
                  style={{
                    backgroundColor: item.settle ? "green" : "transparent",
                    paddingHorizontal: 10,
                  }}
                >
                  {item.transaction}
                </Text>
              ))}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default EventSummary;
