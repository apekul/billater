import React, { useContext } from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import { stylesEvent } from "../styles/style";
import moment from "moment";
import { EventContext } from "../context";
// import DatePicker from "react-native-datepicker";

const CreateEvent = () => {
  const { events, setEvents } = useContext(EventContext);

  // const addNewEvent = () => {
  //   const newID = Math.max(events.map((v) => v.id)) + 1;
  //   const newTitle = `Event Created ${moment(new Date()).format("h:mm a")}`;
  //   const newItem = {
  //     id: newID,
  //     title: newTitle,
  //     ppl: 3,
  //     value: {},
  //     date: new Date(),
  //   };
  //   setEvents((prev) => [...prev, newItem]);
  // };
  return (
    <View style={stylesEvent.container}>
      <View>
        <Text>Event Title</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={stylesEvent.textInput}
          // value={name}
          placeholder="Event Title..."
          placeholderTextColor="#BDBDBD"
          // onChangeText={(newText) => setName(newText)}
        />
      </View>

      <View>
        <Text>Date</Text>
        {/* <DatePicker
          style={styles.datePicker}
          date={selectedDate}
          mode="date"
          placeholder="Select date"
          format="YYYY-MM-DD"
          minDate="2022-01-01"
          maxDate="2025-12-31"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          onDateChange={handleDateChange}
        /> */}
      </View>

      <View>
        <Text>Who pays</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={stylesEvent.textInput}
          // value={name}
          placeholder="Who pays..."
          placeholderTextColor="#BDBDBD"
          // onChangeText={(newText) => setName(newText)}
        />
      </View>
    </View>
  );
};

export default CreateEvent;
