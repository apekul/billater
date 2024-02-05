import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  Alert,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import IconAnt from "react-native-vector-icons/AntDesign";
import IconMat from "react-native-vector-icons/MaterialIcons";

const fakeItems = [
  { id: 1, title: "Beer", ppl: 3, value: {}, date: "02.02.2024" },
  { id: 2, title: "Kebab", ppl: 3, value: {}, date: "01.02.2024" },
  { id: 3, title: "Food", ppl: 3, value: {}, date: "10.01.2024" },
  { id: 4, title: "Food", ppl: 3, value: {}, date: "10.01.2024" },
];
const EventList = () => {
  const [events, setEvents] = useState(fakeItems);

  const addNewEvent = () => {
    const newID = Math.max(events.map((v) => v.id)) + 1;
    const newItem = {
      id: newID,
      title: "sampleName",
      ppl: 3,
      value: {},
      date: new Date(),
    };
    setEvents((prev) => [...prev, newItem]);
  };

  const groupedItems = events.reduce((acc, event) => {
    const date = event.date;

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
        style={[styles.btn]}
        onPress={() => {
          return addNewEvent();
        }}
      >
        <IconMat name="add-box" size={40} color="#898A8D" />
      </TouchableHighlight>
      {/* Event */}
      <ScrollView>
        {Object.entries(groupedItems).map(([date, events], i) => (
          <View key={i} style={{ marginBottom: 10 }}>
            <View style={styles.dateBar}>
              <Text style={{ paddingHorizontal: 10, fontWeight: "bold" }}>
                {date}
              </Text>
            </View>

            {events.map((event, j) => (
              <View key={j} style={[styles.group, { marginVertical: 10 }]}>
                <View style={[styles.group, { gap: 10 }]}>
                  <View style={styles.icon}></View>
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
        ))}
      </ScrollView>
    </View>
  );
};

export default EventList;
const styles = StyleSheet.create({
  dateBar: {
    backgroundColor: "#EFEFEF",
    borderRadius: 10,
    padding: 3,
  },
  icon: {
    width: 40,
    height: 40,
    backgroundColor: "#898A8D",
    borderRadius: 5,
  },
  group: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#EFEFEF",
    borderRadius: 5,
    alignItems: "center",
  },
});
