import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import { stylesEvent } from "../styles/style";
import moment from "moment";
import { EventContext } from "../context";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome5";

const CreateEvent = ({ navigation }) => {
  const { events, setEvents, user } = useContext(EventContext);
  const [date, setDate] = useState(new Date());
  const [title, setTitle] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [whoPays, setWhoPays] = useState(user);
  const newID = Math.random().toString(36).substr(2, 9);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setOpenDate(false);
    setDate(currentDate);
  };

  const addNewEvent = () => {
    const newItem = {
      id: newID,
      title: title,
      ppl: 3,
      value: [],
      date: date,
    };
    setEvents((prev) => [...prev, newItem]);
  };
  return (
    <View style={stylesEvent.container}>
      <View>
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

      <View>
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
          />
        )}
      </View>

      <View>
        <Text>Who pays</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={stylesEvent.textInput}
          value={whoPays}
          placeholder="Who pays..."
          placeholderTextColor="#BDBDBD"
          onChangeText={(newText) => setWhoPays(newText)}
        />
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
