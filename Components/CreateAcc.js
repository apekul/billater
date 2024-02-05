import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import { stylesLogin } from "../styles/style";

const CreateAcc = ({ navigation }) => {
  const [name, setName] = useState("");

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
            return navigation.navigate("Home", { name });
          }}
        >
          <Text style={stylesLogin.btnText}>APPLY</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

export default CreateAcc;
