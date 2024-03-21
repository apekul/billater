import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableHighlight, Alert } from "react-native";
import { stylesEvent } from "../styles/style";
import moment from "moment";
import Icon from "react-native-vector-icons/FontAwesome5";
import DateTimePicker from "@react-native-community/datetimepicker";
import { EventContext } from "../context";

const SettingsEvent = ({ currentEvent, setShowSettings, navigation }) => {
  const { events, setEvents } = useContext(EventContext);
  const [title, setTitle] = useState(currentEvent?.title);
  const [date, setDate] = useState(new Date(currentEvent?.date));
  const [openDate, setOpenDate] = useState(false);

  const updateEvent = () => {
    const newEvents = events.map((e) => {
      if (e.id === currentEvent.id) {
        e.title = title;
        e.date = date;
      }
      return e;
    });
    setEvents(newEvents);
    setShowSettings(false);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpenDate(false);
    setDate(currentDate);
  };

  const deleteEvent = () => {
    const newEvents = events.filter((e) => e.id !== currentEvent.id);
    Alert.alert(
      "Delete Event",
      "Are you sure you want to delete this event?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: () => {
            setEvents(newEvents);
            navigation.navigate("Home");
          },
          style: "destructive",
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <View
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.7)",
        position: "absolute",
        top: 0,
        right: 0,
        left: 0,
        height: "100%",
        zIndex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          marginHorizontal: 15,
          marginVertical: 10,
          padding: 10,
          gap: 5,
          borderRadius: 10,
        }}
      >
        <View>
          <Text>Change title</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={stylesEvent.textInput}
            value={title}
            placeholder="Event Title..."
            placeholderTextColor="#BDBDBD"
            onChangeText={(newText) => setTitle(newText)}
          />
        </View>
        <View>
          <Text>Change Date</Text>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            style={[stylesEvent.textInput, { width: 170 }]}
            placeholder="Who pays..."
            onPress={() => setOpenDate(!openDate)}
          >
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
              }}
            >
              <Icon name="calendar" size={15} />
              <Text>{moment(date).format("LL")}</Text>
            </View>
          </TouchableHighlight>
          {openDate && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              is24Hour={true}
              onChange={onChange}
              maximumDate={new Date()}
            />
          )}
        </View>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {/* Delete Event */}
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              backgroundColor: "red",
              borderRadius: 5,
            }}
            onPress={() => deleteEvent()}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Delete Event
            </Text>
          </TouchableHighlight>

          {/* Confirm Changes */}
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="#DDDDDD"
            style={{
              paddingVertical: 10,
              paddingHorizontal: 10,
              backgroundColor: "green",
              borderRadius: 5,
            }}
            onPress={() => updateEvent()}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Confirm</Text>
          </TouchableHighlight>
        </View>
      </View>
    </View>
  );
};

export default SettingsEvent;
