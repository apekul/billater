import React from "react";
import { View, Text } from "react-native";
import { stylesSummary } from "../styles/style";

const EventSummary = ({ currentEvent }) => {
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

      // Add buyer to summary if not present
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

        // Update spend for buyer and owes for receipient if item is not settled
        if (!settle) {
          summary[buyer].spend += +price;
          summary[receipient].owes += +price;
        }
      });
    });

    return summary;
  };
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={stylesSummary.header}>Summary</Text>
      <View style={stylesSummary.container}>
        <View style={stylesSummary.group}>
          <Text style={stylesSummary.total}>Total money spend:</Text>
          <Text style={stylesSummary.total}>{calculateTotalSum()}$</Text>
        </View>

        {Object.entries(calculateSummary(currentEvent)).map(
          ([person, info]) => (
            <View
              key={person}
              style={[
                stylesSummary.group,
                info.owes > 0
                  ? { backgroundColor: "pink" }
                  : { backgroundColor: "lightgreen" },
              ]}
            >
              <Text style={{ width: 100 }}>{person}</Text>
              <Text
                style={{
                  width: 100,
                  textAlign: "left",
                }}
              >
                Owes: {info.owes > 0 ? "-" + info.owes : info.owes}$
              </Text>
              <Text style={{ width: 100, textAlign: "right" }}>
                Spend: {info.spend}$
              </Text>
            </View>
          )
        )}
        {console.log(calculateSummary(currentEvent))}
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text>Export to file</Text>
      </View>
    </View>
  );
};

export default EventSummary;
