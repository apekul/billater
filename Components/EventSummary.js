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
  return (
    <View style={{ marginVertical: 10 }}>
      <Text style={stylesSummary.header}>Summary</Text>
      <View style={stylesSummary.container}>
        <View style={stylesSummary.group}>
          <Text style={stylesSummary.total}>Total money spend:</Text>
          <Text style={stylesSummary.total}>
            {calculateTotalSum()}
            <Text style={{ fontSize: 12 }}> {currency}</Text>
          </Text>
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
              <Text style={{ width: 100, textAlign: "left" }}>
                Spend: {info.spend}
                <Text style={{ fontSize: 12 }}> {currency}</Text>
              </Text>
              <Text
                style={{
                  width: 100,
                  textAlign: "right",
                }}
              >
                Owes: {info.owes > 0 ? "-" + info.owes : info.owes}
                <Text style={{ fontSize: 12 }}> {currency}</Text>
              </Text>
            </View>
          )
        )}
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text>Export to file</Text>
      </View>
    </View>
  );
};

export default EventSummary;
