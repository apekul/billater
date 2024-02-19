import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import { stylesActivitie } from "../styles/style";
import { stylesEvent } from "../styles/style";
import { EventContext } from "../context";

const CreateActivity = ({ route, navigation }) => {
  const { events, setEvents, user } = useContext(EventContext);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [buyer, setBuyer] = useState(user);
  const [forWho, setForWho] = useState("");

  // isValid
  const [titleValid, setTitleValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);
  const [buyerValid, setBuyerValid] = useState(true);
  const [forWhoValid, setForWhoValid] = useState(true);

  const handleTitleChange = (text) => {
    setTitle(text);
  };

  const handleSubmit = () => {
    // Validate individual input fields and set validity state accordingly
    const isTitleValid = title.trim() !== "";
    const isPriceValid = price.trim() !== "" && !isNaN(price);
    const isBuyerValid = buyer.trim() !== "";
    const isForWhoValid = forWho.trim() !== "";
    setTitleValid(isTitleValid);
    setPriceValid(isPriceValid);
    setBuyerValid(isBuyerValid);
    setForWhoValid(isForWhoValid);

    // Submit logic here...
    if (isTitleValid && isPriceValid && isBuyerValid && isForWhoValid) {
      addNewAct();
      navigation.navigate("Event", { id: route.params.id });
    }
  };

  // [
  //   {
  //     date: "2024-02-16T16:17:02.671Z",
  //     id: "8ktlqrua1",
  //     ppl: 3,
  //     title: "Kebav",
  //     value: [
  //       {
  //         buyer: "Adam",
  //         items: [
  //           {
  //             name: "test",
  //             price: 12,
  //             receipient: "Adas",
  //           },
  //           {
  //             name: "asd",
  //             price: 20,
  //             receipient: "Adas",
  //           },
  //         ],
  //         total: "2",
  //       },
  //     ],
  //   },
  // ];

  const buyerExists = (eventId, buyerName) => {
    const event = events.find((item) => item.id === eventId);
    if (!event) return false;
    return event.value.some((val) => val.buyer === buyerName);
  };

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
    const newItem = {
      name: title,
      price: price,
      receipient: forWho,
    };
    buyerExists(id, buyer)
      ? // Update array inside event (route.params.id) value (array)
        setEvents((prev) => {
          return prev.map((item) => {
            if (item.id === id) {
              const updatedValue = item.value.map((val) => {
                if (val.buyer === buyer) {
                  const newTotal = +val.total + +price;
                  return {
                    ...val,
                    items: [...val.items, newItem],
                    total: newTotal,
                  };
                }
                return val;
              });
              return {
                ...item,
                value: updatedValue,
              };
            }
            return item;
          });
        })
      : setEvents((prev) => {
          return prev.map((item) => {
            if (item.id === id) {
              return {
                ...item,
                value: [...item.value, newAct],
              };
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
          style={[stylesEvent.textInput, !titleValid && { borderColor: "red" }]}
          value={title}
          placeholder="Title..."
          placeholderTextColor="#BDBDBD"
          onChangeText={(newText) => handleTitleChange(newText)}
        />
      </View>

      {/* Set Price */}
      <View>
        <Text>Price</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={[stylesEvent.textInput, !priceValid && { borderColor: "red" }]}
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
            style={[
              stylesEvent.textInput,
              !buyerValid && { borderColor: "red" },
            ]}
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
            style={[
              stylesEvent.textInput,
              !forWhoValid && { borderColor: "red" },
            ]}
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
        onPress={handleSubmit}
      >
        <Text style={stylesActivitie.btnText}>CREATE</Text>
      </TouchableHighlight>
    </View>
  );
};

export default CreateActivity;
