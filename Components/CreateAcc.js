import React, { useContext } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
} from "react-native";
import { stylesLogin } from "../styles/style";
import { EventContext } from "../context";

const CreateAcc = ({ navigation }) => {
  const { user, setUser } = useContext(EventContext);

  return (
    <SafeAreaView style={stylesLogin.container}>
      <View style={stylesLogin.group}>
        <View>
          <Text style={stylesLogin.text}>Enter your name</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={stylesLogin.textInput}
            value={user}
            placeholder="Name..."
            placeholderTextColor="#BDBDBD"
            onChangeText={(newText) => setUser(newText)}
          />
        </View>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          style={stylesLogin.button}
          onPress={() => {
            if (user.length > 0) {
              return navigation.navigate("Home");
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
