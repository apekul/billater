import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableHighlight,
  SafeAreaView,
  Dimensions,
} from "react-native";

const screenHeight = Dimensions.get("window").height;

const CreateAcc = ({ navigation }) => {
  const [name, setName] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.group}>
        <View>
          <Text style={styles.text}>Enter your name</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={styles.textInput}
            value={name}
            placeholder="Name..."
            placeholderTextColor="#BDBDBD"
            onChangeText={(newText) => setName(newText)}
          />
        </View>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          style={styles.button}
          onPress={() => {
            return navigation.navigate("Home", { name });
          }}
        >
          <Text style={styles.btnText}>APPLY</Text>
        </TouchableHighlight>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.5,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 25,
  },
  group: {
    flex: 1,
    marginTop: 20,
    justifyContent: "space-between",
  },
  textInput: {
    height: 50,
    fontSize: 20,
    marginTop: 12,
    marginBottom: 12,
    borderWidth: 1,
    backgroundColor: "#F6F6F6",
    borderColor: "#E8E8E8",
    padding: 10,
    borderRadius: 10,
  },
  text: {
    textAlign: "center",
    fontSize: 30,
    marginBottom: 20,
    fontWeight: "bold",
  },
  button: {
    borderRadius: 50,
    backgroundColor: "#5DB075",
    padding: 10,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default CreateAcc;
