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

const ManyUsersInput = ({ users, setUsers, usersValid, getUniqueUsers }) => {
  const { user } = useContext(EventContext);
  const [allUsers, setAllUsers] = useState([]);
  const [newUser, setNewUser] = useState("");

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
        {/* {users.length > 0 && (
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
        )} */}
        <View style={{ flexGrow: 1 }}>
          <FlatList
            data={allUsers}
            style={{ backgroundColor: "#FFFFFF", height: 200 }}
            keyExtractor={(item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View style={{ height: 1, backgroundColor: "#E0E0E0" }} />
            )}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  gap: 10,
                  paddingHorizontal: 10,
                  backgroundColor: "#F6F6F6",
                }}
                onPress={() => updateUsers(item)}
              >
                <View
                  style={{ alignItems: "center", justifyContent: "center" }}
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
                </View>
                <Text
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 10,
                    fontSize: 16,
                    color: "#333333",
                  }}
                >
                  {item} {item === user && "(You)"}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default ManyUsersInput;
