import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import { stylesActivitie } from "../styles/style";
import { stylesEvent } from "../styles/style";
import { EventContext } from "../context";
const CreateActivity = ({ route, navigation }) => {
  const { events, setEvents, user } = useContext(EventContext);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [buyer, setBuyer] = useState(user);
  const [forWho, setForWho] = useState("");
  // {
  //   buyer: "John Wick",
  //   items: [
  //     {
  //       name: "Kebab",
  //       price: 20,
  //       receipient: "Micha Dzik",
  //     },
  //     {
  //       name: "Piwo",
  //       price: 30,
  //       receipient: "Jhon Doe",
  //     },
  //   ],
  //   total: 50,
  // },
  const addNewAct = () => {
    const id = route.params.id;
    const newAct = {
      buyer: buyer,
      items: [
        {
          name: title,
          price: price,
          receipient: forWho,
        },
      ],
      total: price,
    };
    // Update array inside event (route.params.id) value (array)
    setEvents((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, value: [...item.value, newAct] };
        }
        return item;
      });
    });
  };

  return (
    <View style={stylesEvent.container}>
      {/* Set Title */}
      <View>
        <Text>Title</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={stylesEvent.textInput}
          value={title}
          placeholder="Title..."
          placeholderTextColor="#BDBDBD"
          onChangeText={(newText) => setTitle(newText)}
        />
      </View>

      {/* Set Price */}
      <View>
        <Text>Price</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={stylesEvent.textInput}
          value={price}
          placeholder="Price..."
          keyboardType="numeric"
          placeholderTextColor="#BDBDBD"
          onChangeText={(newPrice) => setPrice(newPrice)}
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
            value={buyer}
            placeholder="Buyer..."
            placeholderTextColor="#BDBDBD"
            onChangeText={(newBuyer) => setBuyer(newBuyer)}
          />
        </View>
        <View style={{ flex: 1 }}>
          <Text>For</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={stylesEvent.textInput}
            value={forWho}
            placeholder="For..."
            placeholderTextColor="#BDBDBD"
            onChangeText={(newForWho) => setForWho(newForWho)}
          />
        </View>
      </View>

      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={[stylesActivitie.button, { marginTop: 20 }]}
        onPress={() => {
          addNewAct();
          return navigation.navigate("Event", { id: route.params.id });
        }}
      >
        <Text style={stylesActivitie.btnText}>CREATE</Text>
      </TouchableHighlight>
    </View>
  );
};

export default CreateActivity;
