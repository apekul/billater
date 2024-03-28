import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import { stylesEvent } from "../styles/style";
import moment from "moment";
import { EventContext } from "../context";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome5";
import { v4 as uuidv4 } from "uuid";
import { getRandomBase64 } from "react-native-get-random-values";

const CreateEvent = ({ navigation }) => {
  const { setEvents, user } = useContext(EventContext);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const newID = uuidv4();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpenDate(false);
    setDate(currentDate);
  };

  const addNewEvent = () => {
    const newItem = {
      id: newID,
      title: title,
      value: [],
      date: date,
    };
    setEvents((prev) => [...prev, newItem]);
  };
  return (
    <View
      style={[stylesEvent.container, { paddingHorizontal: 16, marginTop: 10 }]}
    >
      <View style={{ gap: 5, paddingTop: 5 }}>
        <Text>Event Title</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={stylesEvent.textInput}
          value={title}
          placeholder="Event Title..."
          placeholderTextColor="#BDBDBD"
          onChangeText={(newText) => setTitle(newText)}
        />
      </View>

      <View style={{ gap: 5, paddingTop: 5 }}>
        <Text>Date</Text>
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

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={[stylesEvent.button, { marginTop: 20 }]}
        onPress={() => {
          addNewEvent();
          return navigation.navigate("Event", { id: newID });
        }}
      >
        <Text style={stylesEvent.btnText}>CREATE</Text>
      </TouchableHighlight>
    </View>
  );
};

export default CreateEvent;
