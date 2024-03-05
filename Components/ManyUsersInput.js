import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import IconMat from "react-native-vector-icons/MaterialIcons";
import { stylesEvent } from "../styles/style";
import { EventContext } from "../context";

const ManyUsersInput = ({ id, users, setUsers, usersValid }) => {
  const { events } = useContext(EventContext);
  const [allUsers, setAllUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  // get all users taking part in activity
  const getUniqueUsers = () => {
    const currentEvent = events.find((v) => v.id === id);
    const uniqueUsersSet = new Set();
    // Iterate over each 'value' object
    currentEvent.value.forEach((val) => {
      // Add buyer and recipient to the set
      uniqueUsersSet.add(val.buyer);
      val.items.forEach((v) => {
        uniqueUsersSet.add(v.receipient);
      });
    });
    return Array.from(uniqueUsersSet);
  };

  // Add new user to AllUsers
  const addUser = () => {
    if (newUser.trim() !== "" && !allUsers.includes(newUser.trim())) {
      setAllUsers((prev) => [...prev, newUser.trim()]);
      setNewUser("");
    }
  };
  // Update Users includes in activity
  const updateUsers = (item) => {
    if (item) {
      const check = users.includes(item);
      return !check
        ? setUsers((prev) => [...prev, item])
        : setUsers((prev) => prev.filter((v) => v !== item));
    }
  };

  const removeUser = (index) => {
    const removed = users.filter((v, i) => i !== index);
    setUsers(removed);
  };

  useEffect(() => {
    setAllUsers(getUniqueUsers());
  }, []);

  return (
    <View>
      <Text>Check existing users or add new one</Text>
      <View
        style={[
          !usersValid && {
            borderColor: "red",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 11,
            borderWidth: 1,
          },
        ]}
      >
        <View style={[{ position: "relative" }]}>
          <TextInput
            placeholder="Recipient..."
            value={newUser}
            onChangeText={(text) => setNewUser(text)}
            underlineColorAndroid="transparent"
            style={[
              users.length > 0 || allUsers.length > 0
                ? stylesEvent.textInputRadiusTop
                : stylesEvent.textInput,
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
          data={allUsers}
          style={{ backgroundColor: "#F6F6F6" }}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View
              style={{ flexDirection: "row", gap: 10, paddingHorizontal: 10 }}
            >
              <TouchableOpacity
                style={{ alignItems: "center", justifyContent: "center" }}
                onPress={() => updateUsers(item)}
              >
                {users.includes(item) ? (
                  <IconMat name="check-box" size={24} color="green" />
                ) : (
                  <IconMat
                    name="check-box-outline-blank"
                    size={24}
                    color="black"
                  />
                )}
              </TouchableOpacity>
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
    </View>
  );
};

export default ManyUsersInput;
