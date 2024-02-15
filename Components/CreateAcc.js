import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import { stylesLogin } from "../styles/style";
import { EventContext } from "../context";

import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateAcc = ({ navigation }) => {
  const { setUser } = useContext(EventContext);
  const [name, setName] = useState("");

  // Define a function to store user data
  const storeUser = async (userData) => {
    try {
      await AsyncStorage.setItem("user", userData);
      // console.log("User data stored successfully");
    } catch (error) {
      console.error("Error storing user data:", error);
    }
  };

  const retrieveData = async () => {
    try {
      // Retrieve user data
      const userValue = await AsyncStorage.getItem("user");
      if (userValue !== null) {
        // console.log("User:", userValue);
        setName(userValue);
      }
    } catch (error) {
      // Error handling
      console.error("Error retrieving data:", error);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);

  return (
    <SafeAreaView style={stylesLogin.container}>
      <View style={stylesLogin.group}>
        <View>
          <Text style={stylesLogin.text}>Enter your name</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={stylesLogin.textInput}
            value={name}
            placeholder="Name..."
            placeholderTextColor="#BDBDBD"
            onChangeText={(newText) => setName(newText)}
          />
        </View>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          style={stylesLogin.button}
          onPress={() => {
            if (name.length > 0) {
              setUser(name);
              storeUser(name);
            }
          }}
        >
          <Text style={stylesLogin.btnText}>APPLY</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default CreateAcc;
