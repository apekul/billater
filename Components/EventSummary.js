import React, { useContext } from "react";
import { View, Text } from "react-native";
import { stylesSummary } from "../styles/style";
import { EventContext } from "../context";

const EventSummary = ({ currentEvent }) => {
  const { currency } = useContext(EventContext);

  const calculateTotalSum = () => {
    const totalSum = currentEvent.value.reduce((acc, curr) => {
      acc += +curr.total;
      return acc;
    }, 0);

    return totalSum;
  };

  const calculateSummary = (transaction) => {
    const summary = {};

    // Iterate through each transaction
    transaction.value.forEach((order) => {
      const buyer = order.buyer;

      // Initialize buyer's spend if not present
      if (!summary[buyer]) {
        summary[buyer] = { spend: 0, owes: 0 };
      }

      // Iterate through each item in the order
      order.items.forEach((item) => {
        const { price, receipient, settle } = item;

        // Add receipient to summary if not present
        if (!summary[receipient]) {
          summary[receipient] = { spend: 0, owes: 0 };
        }

        // Update owes for receipient
        if (!settle) {
          summary[receipient].owes += +price;
        }
      });

      // Update buyer's spend for the order
      summary[buyer].spend += +order.total;
    });

    return summary;
  };
  const WhoOwesWho = () => {
    let summary = {};
    let history = [];

    currentEvent.value.forEach((value) => {
      value.items.forEach((item) => {
        let key1 = `${item.receipient} owes ${value.buyer}`;
        let key2 = `${value.buyer} owes ${item.receipient}`;

        history.push({
          transaction: `${value.buyer} paid ${item.price} for ${item.receipient}`,
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
            {`${key}: ${value.amount}`}
          </Text>
        ))}
      </View>
      <View style={stylesSummary.container}>
        <View style={stylesSummary.group}>
          <Text style={stylesSummary.total}>Total money spend:</Text>
          <Text style={stylesSummary.total}>
            {calculateTotalSum()}
            <Text style={{ fontSize: 12 }}> {currency}</Text>
          </Text>
        </View>
        {history.map((item, index) => (
          <Text
            key={index}
            style={{
              backgroundColor: item.settle ? "#2ecc71" : "transparent",
              paddingHorizontal: 10,
            }}
          >
            {item.transaction}
          </Text>
        ))}
      </View>
    </View>
  );
};

export default EventSummary;
