import React from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import { stylesActivitie } from "../styles/style";
import { stylesEvent } from "../styles/style";
const CreateActivity = () => {
  return (
    <View style={stylesEvent.container}>
      {/* Set Title */}
      <View>
        <Text>Title</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={stylesEvent.textInput}
          // value={title}
          placeholder="Title..."
          placeholderTextColor="#BDBDBD"
          // onChangeText={(newText) => setTitle(newText)}
        />
      </View>

      {/* Set Price */}
      <View>
        <Text>Price</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={stylesEvent.textInput}
          // value={title}
          placeholder="Price..."
          placeholderTextColor="#BDBDBD"
          // onChangeText={(newText) => setTitle(newText)}
        />
      </View>

      {/* Set Buyer/for */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text>Buyer</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={stylesEvent.textInput}
            // value={title}
            placeholder="Buyer..."
            placeholderTextColor="#BDBDBD"
            // onChangeText={(newText) => setTitle(newText)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text>For</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={stylesEvent.textInput}
            // value={title}
            placeholder="For..."
            placeholderTextColor="#BDBDBD"
            // onChangeText={(newText) => setTitle(newText)}
          />
        </View>
      </View>

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={[stylesActivitie.button, { marginTop: 20 }]}
        onPress={() => {
          // addNewEvent();
          // return navigation.navigate("Event", { id: newID });
        }}
      >
        <Text style={stylesActivitie.btnText}>CREATE</Text>
      </TouchableHighlight>
    </View>
  );
};

export default CreateActivity;
