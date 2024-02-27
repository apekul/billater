import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  ScrollView,
} from "react-native";
import IconMat from "react-native-vector-icons/MaterialIcons";
import { stylesActivitie } from "../styles/style";
import { stylesEvent } from "../styles/style";
import { EventContext } from "../context";
import EventSummary from "./EventSummary";

const Activities = ({ currentEvent, navigation }) => {
  const { setEvents, currency } = useContext(EventContext);

  // pass currentEvent.value, array of payments
  // const fakeAct = [
  //   {
  //     buyer: "John Wick",
  //     items: [
  //       {
  //         name: "Kebab",
  //         price: 20,
  //         receipient: "Micha Dzik",
  //         settle: false,
  //       },
  //     ],
  //     total: 50,
  //   },
  // ];

  // Update settle onClick boolean
  const updateSettle = (itemId) => {
    const eventId = currentEvent.id;
    setEvents((prevData) => {
      // Find the event with the matching event ID
      const updatedData = prevData.map((event) => {
        if (event.id === eventId) {
          // Find the item within the value array with the matching item ID
          const updatedValue = event.value.map((value) => ({
            ...value,
            items: value.items.map((item) => {
              if (item.id === itemId) {
                // Toggle the settle property of the item
                return { ...item, settle: !item.settle };
              }
              return item;
            }),
          }));
          return { ...event, value: updatedValue };
        }
        return event;
      });
      return updatedData;
    });
  };

  const groupedAct = currentEvent.value.reduce((acc, curr) => {
    const buyer = curr.buyer;
    if (!acc[buyer]) {
      acc[buyer] = [];
    }
    acc[buyer].push(curr);
    return acc;
  }, {});

  return (
    <View style={stylesActivitie.container}>
      <Text style={[stylesActivitie.txtBold, { paddingHorizontal: 16 }]}>
        Activities:
      </Text>
      {/* Add event Button */}
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={[stylesEvent.btn, { marginHorizontal: 16 }]}
        onPress={() => {
          return navigation.navigate("CreateActivity", { id: currentEvent.id });
        }}
      >
        <IconMat name="add-box" size={40} color="#898A8D" />
      </TouchableHighlight>

      {/* List */}
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {Object.entries(groupedAct).map(([buyer, events], i) => (
          <View key={i} style={{ marginBottom: 10 }}>
            <View
              style={[
                stylesActivitie.group,
                {
                  backgroundColor: "#F6F6F6",
                  padding: 5,
                },
              ]}
            >
              <Text style={stylesActivitie.txtBold}>{buyer}</Text>
              <Text style={stylesActivitie.txtBold}>
                total spend {events.total}
                {events.map((event, index) => (
                  <Text key={index}>
                    {event.total}
                    <Text style={{ fontSize: 12 }}> {currency}</Text>
                  </Text>
                ))}
              </Text>
            </View>

            <View
              style={{
                gap: 5,
                backgroundColor: "#E8E8E8",
              }}
            >
              {events.map((event, index) => (
                <View key={index}>
                  {Object.values(event.items).map((act, j) => (
                    <TouchableOpacity
                      key={j}
                      onPress={() => updateSettle(act.id)}
                      style={[
                        stylesActivitie.group,
                        {
                          paddingVertical: 12,
                          paddingHorizontal: 10,
                        },
                        act.settle && {
                          opacity: 0.6,
                          backgroundColor: "lightgray",
                        },
                      ]}
                    >
                      <View
                        style={[
                          stylesActivitie.actItem,
                          { flexDirection: "row", gap: 10 },
                        ]}
                      >
                        {act.settle ? (
                          <IconMat name="check-box" size={24} color="green" />
                        ) : (
                          <IconMat
                            name="check-box-outline-blank"
                            size={24}
                            color="black"
                          />
                        )}
                        <Text style={{ fontSize: 15 }}>{act.name}</Text>
                      </View>
                      <Text
                        style={[
                          stylesActivitie.actItem,
                          { textAlign: "center" },
                        ]}
                      >
                        {act.receipient}
                      </Text>
                      <Text
                        style={[
                          stylesActivitie.actItem,
                          { textAlign: "right" },
                        ]}
                      >
                        {act.price}
                        <Text style={{ fontSize: 12 }}> {currency}</Text>
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </View>
          </View>
        ))}
        {currentEvent.value.length > 0 && (
          <EventSummary currentEvent={currentEvent} />
        )}
      </ScrollView>
    </View>
  );
};
export default Activities;
