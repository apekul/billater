import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { stylesEvent } from "../styles/style";
import { EventContext } from "../context";

const ManyUsersInput = ({ id }) => {
  const { events, setEvents, user } = useContext(EventContext);

  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [newUser, setNewUser] = useState("");
  // Check if submiting user exist, if yes then dont addUser
  // Add all users existing in event to Recipient for check or uncheck
  // Change remove Icons to checkboxes, checked means that user is taking part of curr activity

  const addUser = () => {
    if (newUser.trim() !== "") {
      setUsers((prev) => [...prev, newUser.trim()]);
      setNewUser("");
    }
  };

  const removeUser = (index) => {
    const removed = users.filter((v, i) => i !== index);
    setUsers(removed);
  };

  return (
    <View>
      <Text>Check existing users or add new one</Text>
      <View style={{ position: "relative" }}>
        <TextInput
          placeholder="Recipient..."
          value={newUser}
          onChangeText={(text) => setNewUser(text)}
          underlineColorAndroid="transparent"
          style={[
            users.length > 0 || allUsers.length > 0
              ? stylesEvent.textInputRadiusTop
              : stylesEvent.textInput,
            // !buyerValid && { borderColor: "red" },
          ]}
          placeholderTextColor="#BDBDBD"
        />
        <TouchableOpacity
          onPress={addUser}
          style={[
            {
              position: "absolute",
              right: 0,
              backgroundColor: "gray",
              padding: 10,
            },
            users.length > 0 || allUsers.length > 0
              ? {
                  borderTopRightRadius: 10,
                }
              : {
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                },
          ]}
        >
          <Text style={{ color: "white" }}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={users}
        style={{ backgroundColor: "#F6F6F6" }}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View
            style={{ flexDirection: "row", gap: 10, paddingHorizontal: 10 }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Icon name="remove" size={15} onPress={() => removeUser(index)} />
            </View>
            <Text
              style={{
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}
            >
              {item}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default ManyUsersInput;
