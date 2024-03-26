import React, { useContext, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableHighlight,
  Alert,
} from "react-native";
import IconMat from "react-native-vector-icons/MaterialIcons";
import { stylesEvent } from "../styles/style";
import moment from "moment";
import { EventContext } from "../context";

const EventList = ({ navigation }) => {
  const { events, setEvents, currency } = useContext(EventContext);
  const [toggleDelete, setToggleDelete] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const groupedItems = events.reduce((acc, event) => {
    const date = moment(event.date).format("MMMM Do YYYY");
    if (!acc[date]) {
      acc[date] = [];
    }

    acc[date].push(event);
    return acc;
  }, {});

  // Convert the object to an array and sort by date in key
  const dataMap = new Map(
    Object.entries(groupedItems).sort(
      (a, b) => moment(b[0], "MMMM Do YYYY") - moment(a[0], "MMMM Do YYYY")
    )
  );

  const calculateTotalSum = (currentEvent) => {
    const totalSum = currentEvent.value.reduce((acc, curr) => {
      acc += +curr.total;
      return acc;
    }, 0);

    return totalSum;
  };

  // Check if payments are settle
  const checkSettle = (currentEvent) => {
    const check = currentEvent.value
      .map((v) => v.items.map((items) => items.settle))
      .flat()
      .every(Boolean);
    return check;
  };

  // Return number of ppl taking part in event
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

  const updateSelectedItems = (id) => {
    if (selectedItems.includes(id)) {
      const remove = selectedItems.filter((v) => v !== id);
      return setSelectedItems(remove);
    }
    return setSelectedItems((prev) => [...prev, id]);
  };

  const deleteSelected = () => {
    const updatedEvents = events.filter(
      (event) => !selectedItems.includes(event.id)
    );
    selectedItems.length <= 0
      ? Alert.alert(
          "No items was selected to delete",
          "Please select item to delete",
          [
            {
              text: "Ok",
              style: "cancel",
            },
          ],
          { cancelable: true }
        )
      : Alert.alert(
          "Delete Items",
          "Are you sure you want to delete selected items?",
          [
            {
              text: "Cancel",
              style: "cancel",
            },
            {
              text: "Delete",
              onPress: () => {
                setToggleDelete(false);
                setSelectedItems([]);
                setEvents(updatedEvents);
              },
              style: "destructive",
            },
          ],
          { cancelable: true }
        );
  };

  return (
    <View style={stylesEvent.eventListGrp}>
      {/* Confirm/Cancel Delete */}
      {toggleDelete && (
        <View
          style={[stylesEvent.group, { paddingHorizontal: 16, paddingTop: 10 }]}
        >
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => {
              setSelectedItems([]);
              return setToggleDelete(false);
            }}
            style={{ backgroundColor: "gray", padding: 5, borderRadius: 5 }}
          >
            <Text style={{ color: "white" }}>Cancel</Text>
          </TouchableHighlight>
          <TouchableHighlight
            disabled={selectedItems.length <= 0}
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            onPress={() => deleteSelected()}
            style={[
              selectedItems.length <= 0
                ? { backgroundColor: "lightgray" }
                : { backgroundColor: "#EF4F2B" },
              { padding: 5, borderRadius: 5 },
            ]}
          >
            <Text style={{ color: "white" }}>Delete Selected</Text>
          </TouchableHighlight>
        </View>
      )}
      {/* Event */}
      <ScrollView style={{ paddingHorizontal: 16 }}>
        {events.length > 0 ? (
          Array.from(dataMap, ([date, events]) => (
            <View key={date} style={{ marginVertical: 10 }}>
              <View style={stylesEvent.dateBar}>
                <Text
                  style={[
                    stylesEvent.txtDark,
                    {
                      paddingHorizontal: 10,
                    },
                  ]}
                >
                  {date}
                </Text>
              </View>
              <View>
                {events.map((event, j) => (
                  <TouchableHighlight
                    key={j}
                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    style={[stylesEvent.eventGrp]}
                    onLongPress={() => setToggleDelete(true)}
                    onPress={() =>
                      toggleDelete
                        ? updateSelectedItems(event.id)
                        : navigation.navigate("Event", { id: event.id })
                    }
                  >
                    <View
                      style={[
                        stylesEvent.group,
                        {
                          padding: 5,
                        },
                      ]}
                    >
                      <View style={[stylesEvent.group, { gap: 10 }]}>
                        <View style={{ position: "relative" }}>
                          {toggleDelete ? (
                            <>
                              {selectedItems.includes(event.id) ? (
                                <IconMat
                                  name="check-box"
                                  size={40}
                                  color="black"
                                />
                              ) : (
                                <IconMat
                                  name="check-box-outline-blank"
                                  size={40}
                                  color="black"
                                />
                              )}
                            </>
                          ) : (
                            <View style={stylesEvent.icon}></View>
                          )}
                        </View>

                        <View>
                          <Text style={stylesEvent.txtDark}>
                            {event.title ? event.title : "No title"}
                          </Text>
                          <Text>{countUniqueUsers(event)} participant</Text>
                        </View>
                      </View>

                      <View style={{ padding: 10 }}>
                        {checkSettle(event) ? (
                          <Text style={{ color: "#2ecc71" }}>setteled up</Text>
                        ) : (
                          <Text style={{ textAlign: "right" }}>balance</Text>
                        )}
                        <Text style={{ textAlign: "right" }}>
                          {calculateTotalSum(event)}
                          <Text style={{ fontSize: 12 }}> {currency}</Text>
                        </Text>
                      </View>
                    </View>
                  </TouchableHighlight>
                ))}
              </View>
            </View>
          ))
        ) : (
          <View style={{ alignItems: "center" }}>
            <Text>No items</Text>
          </View>
        )}
        <View style={{ height: 100 }}></View>
      </ScrollView>

      {/* AddBtn */}
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="transparent" // Make underlay color transparent
        style={{
          position: "absolute",
          bottom: 5,
          right: 5,
        }}
        onPress={() => {
          setSelectedItems([]);
          setToggleDelete(false);
          return navigation.navigate("CreateEvent");
        }}
      >
        <View
          style={{
            position: "relative",
            alignItems: "center",
          }}
        >
          <IconMat
            name="add-box"
            size={90}
            color="#5DB075"
            style={{
              zIndex: 1,
            }}
          />
          <View
            style={{
              width: 60,
              height: 60,
              top: 15,
              backgroundColor: "white",
              position: "absolute",
            }}
          ></View>
        </View>
      </TouchableHighlight>
    </View>
  );
};

export default EventList;
