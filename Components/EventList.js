import React, { useContext } from "react";
import { View, Text, ScrollView, TouchableHighlight } from "react-native";
import IconMat from "react-native-vector-icons/MaterialIcons";
import { stylesEvent } from "../styles/style";
import moment from "moment";
import { EventContext } from "../context";

const EventList = ({ navigation }) => {
  const { events, setEvents } = useContext(EventContext);

  const groupedItems = events.reduce((acc, event) => {
    const date = moment(event.date).format("MMMM Do YYYY");
    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(event);

    return acc;
  }, {});
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

              {events.map((event, j) => (
                <View
                  key={j}
                  style={[stylesEvent.group, { marginVertical: 10 }]}
                >
                  <View style={[stylesEvent.group, { gap: 10 }]}>
                    <View style={stylesEvent.icon}></View>
                    <View>
                      <Text style={{ fontWeight: "bold" }}>{event.title}</Text>
                      <Text>{event.ppl} participant</Text>
                    </View>
                  </View>

                  <View>
                    <Text>balance</Text>
                    <Text>$20</Text>
                  </View>
                </View>
              ))}
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
