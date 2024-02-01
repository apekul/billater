import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  TextInput,
  TouchableHighlight,
} from "react-native";

const CreateAcc = () => {
  const [name, setName] = useState("");

  return (
    <View style={styles.container}>
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
        onPress={() => Alert.alert(`Apply CLicked with value of ${name}`)}
      >
        <Text style={styles.btnText}>APPLY</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  textInput: {
    textDecoration: "none",
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
