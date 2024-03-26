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
          transaction: [
            { text: "Paid ", style: {} },
            { text: `${item.price} `, style: { fontWeight: "bold" } },
            { text: `${currency} `, style: { fontWeight: "bold" } },
            { text: `for `, style: {} },
            { text: `${item.name} `, style: {} },
            { text: `${item.receipient}`, style: { fontWeight: "bold" } },
          ],
          settle: item.settle,
        });

        if (!item.settle) {
          // Only add to summary if the item is not settled
          if (!summary[key2]) {
            if (summary[key1]) {
              summary[key1] = {
                buyer: { text: value.buyer, style: { fontWeight: "bold" } },
                recipient: {
                  text: item.receipient,
                  style: { fontWeight: "bold" },
                },
                amount: summary[key1]
                  ? summary[key1].amount + parseFloat(item.price)
                  : parseFloat(item.price),
                settle: item.settle,
              };
            } else {
              summary[key1] = {
                buyer: { text: value.buyer, style: { fontWeight: "bold" } },
                recipient: {
                  text: item.receipient,
                  style: { fontWeight: "bold" },
                },
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
      <View style={{ marginVertical: 10 }}>
        {Object.entries(summary).map(([key, value], index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={[value.recipient.style, { fontSize: 16 }]}>
              {value.recipient.text}
            </Text>
            <Text style={{ fontSize: 16, marginHorizontal: 5 }}>owes</Text>
            <Text style={[value.buyer.style, { fontSize: 16 }]}>
              {value.buyer.text}
            </Text>
            <Text
              style={{
                color: "red",
                fontWeight: "bold",
                fontSize: 16,
                marginLeft: 5,
              }}
            >
              {value.amount} {currency}
            </Text>
          </View>
        ))}
      </View>
      <View style={stylesSummary.container}>
        <Text style={stylesSummary.total}>Transactions</Text>
        {Object.entries(history).map(([buyer, transactions], index) => (
          <TouchableOpacity
            key={index}
            onPress={() =>
              setSelectedBuyer(selectedBuyer === buyer ? null : buyer)
            }
            style={[
              {
                flexDirection: "column",
                padding: 10,
                backgroundColor: "#E8E8E8",
                borderColor: "grey",
                borderBottomWidth: 1,
              },
              index === Object.entries(history).length - 1 && {
                borderBottomWidth: 0,
              },
            ]}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 3 }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>{buyer}</Text>
              <Text>spend</Text>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {transactions.reduce(
                  (total, item) => total + parseFloat(item.transaction[1].text),
                  0
                )}{" "}
                {currency}
              </Text>
              <Text>({transactions.length} transactions)</Text>
            </View>

            {/* history */}
            {buyer === selectedBuyer &&
              transactions.map((transaction, index) => (
                <View
                  key={index}
                  style={{
                    backgroundColor: transaction.settle
                      ? "#5DB075"
                      : "transparent",
                    paddingHorizontal: 5,
                    paddingVertical: 3,
                    flexDirection: "row",
                    borderColor: "transparent",
                    borderWidth: 1,
                  }}
                >
                  {transaction.transaction.map((part, index) => (
                    <Text key={index} style={part.style}>
                      {part.text}
                    </Text>
                  ))}
                </View>
              ))}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default EventSummary;
