import React, { useContext } from "react";
import { View, Text, ScrollView, TouchableHighlight } from "react-native";
import IconMat from "react-native-vector-icons/MaterialIcons";
import { stylesEvent } from "../styles/style";
import moment from "moment";
import { EventContext } from "../context";

const EventList = ({ navigation }) => {
  const { events } = useContext(EventContext);

  const groupedItems = events.reduce((acc, event) => {
    const date = moment(event.date).format("MMMM Do YYYY");
    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(event);

    return acc;
  }, {});

  const calculateTotalSum = () => {
    const totalSum = events.reduce((acc, event) => {
      event.value.forEach((val) => {
        acc += +val.total;
      });
      return acc;
    }, 0);

    return totalSum;
  };

  const countUniqueUsers = (object) => {
    const uniqueUsersSet = new Set();

    // Iterate over each 'value' object
    object.value.forEach((val) => {
      // Add buyer and recipient to the set
      uniqueUsersSet.add(val.buyer);
      val.items.forEach((v) => {
        uniqueUsersSet.add(v.receipient);
      });
    });

    // Get the size of the Set, which represents the number of unique users
    const numberOfUniqueUsers = uniqueUsersSet.size;
    return numberOfUniqueUsers;
  };

  return (
    <View style={{ flex: 1, gap: 20 }}>
      {/* Add event Button */}
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={[stylesEvent.btn]}
        onPress={() => {
          // return addNewEvent();
          return navigation.navigate("CreateEvent");
        }}
      >
        <IconMat name="add-box" size={40} color="#898A8D" />
      </TouchableHighlight>
      {/* Event */}
      <ScrollView>
        {events.length > 0 ? (
          Object.entries(groupedItems).map(([date, events], i) => (
            <View key={i} style={{ marginBottom: 10 }}>
              <View style={stylesEvent.dateBar}>
                <Text style={{ paddingHorizontal: 10, fontWeight: "bold" }}>
                  {date}
                </Text>
              </View>
              <View style={{ gap: 5 }}>
                {events.map((event, j) => (
                  <TouchableHighlight
                    key={j}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    style={{
                      padding: 5,
                    }}
                    onPress={() => {
                      return navigation.navigate("Event", { id: event.id });
                    }}
                  >
                    <View style={[stylesEvent.group]}>
                      <View style={[stylesEvent.group, { gap: 10 }]}>
                        <View style={stylesEvent.icon}></View>
                        <View>
                          <Text style={{ fontWeight: "bold" }}>
                            {event.title ? event.title : "No title"}
                          </Text>
                          <Text>{countUniqueUsers(event)} participant</Text>
                        </View>
                      </View>

                      <View>
                        <Text>balance</Text>
                        <Text>${calculateTotalSum()}</Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                ))}
              </View>
            </View>
          ))
        ) : (
          <Text>No items</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default EventList;
