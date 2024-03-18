import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import IconMat from "react-native-vector-icons/MaterialIcons";
import { stylesEvent } from "../styles/style";
import { EventContext } from "../context";

const ManyUsersInput = ({ id, users, setUsers, usersValid }) => {
  const { events, user } = useContext(EventContext);
  const [allUsers, setAllUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

  // get all unique users from app. Users already taking part in activity show on top
  const getUniqueUsers = () => {
    const uniqueUsersSet = new Set(); // holds all unique users
    const uniqueUsersActivitySet = new Set(); // holds all unique users that are already taking part in activity
    events.forEach((event) => {
      event.value.forEach((val) => {
        if (event.id === id) uniqueUsersActivitySet.add(val.buyer);
        uniqueUsersSet.add(val.buyer);
        val.items.forEach((v) => {
          if (event.id === id) uniqueUsersActivitySet.add(v.receipient);
          uniqueUsersSet.add(v.receipient);
        });
      });
    });
    const uniqueUsersArray = Array.from(uniqueUsersSet);
    // Sort uniqueUsersArray so that users already taking part in activity show on top
    uniqueUsersArray.sort((a, b) => {
      if (uniqueUsersActivitySet.has(a) && !uniqueUsersActivitySet.has(b)) {
        return -1;
      } else if (
        !uniqueUsersActivitySet.has(a) &&
        uniqueUsersActivitySet.has(b)
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    return uniqueUsersArray;
  };

  // Add new user to AllUsers
  const addUser = () => {
    if (newUser.trim() !== "" && !allUsers.includes(newUser.trim())) {
      setAllUsers((prev) => [newUser.trim(), ...prev]);
      updateUsers(newUser.trim());
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

  // const removeUser = (index) => {
  //   const removed = users.filter((v, i) => i !== index);
  //   setUsers(removed);
  // };

  useEffect(() => {
    setAllUsers(getUniqueUsers());
  }, []);

  return (
    <View>
      <Text>Select existing user or add new one</Text>
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
        {/* SelectedUsers */}
        {users.length > 0 && (
          <View style={{ marginVertical: 5 }}>
            <Text>Selected users:</Text>
            <View style={{ flexDirection: "row", gap: 5, flexWrap: "wrap" }}>
              {users.map((user, i) => (
                <Text
                  key={i}
                  style={{
                    backgroundColor: "#E8E8E8",
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                  }}
                >
                  {user}
                </Text>
              ))}
            </View>
          </View>
        )}
        <FlatList
          data={allUsers}
          style={{ backgroundColor: "#F6F6F6", maxHeight: 200 }}
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
                {item} {item === user && "(You)"}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

export default ManyUsersInput;
