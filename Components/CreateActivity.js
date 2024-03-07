import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableHighlight } from "react-native";
import { stylesActivitie } from "../styles/style";
import { stylesEvent } from "../styles/style";
import { EventContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import AntIcon from "react-native-vector-icons/AntDesign";
import ManyUsersInput from "./ManyUsersInput";

const splitOptions = [
  { id: 1, text: "Split full price evenly" },
  { id: 2, text: "Everyone same price value" },
];

const CreateActivity = ({ route, navigation }) => {
  const { events, setEvents, user, currency } = useContext(EventContext);
  const { id } = route.params;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [buyer, setBuyer] = useState(user);

  // users list recipients
  const [users, setUsers] = useState([]);

  // Split options
  const [splitOpt, setSplitOpt] = useState(splitOptions[0]);
  const [showOpt, setShowOpt] = useState(false);

  // isValid
  const [titleValid, setTitleValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);
  const [buyerValid, setBuyerValid] = useState(true);
  // const [forWhoValid, setForWhoValid] = useState(true);
  const [usersValid, setUsersValid] = useState(true);

  const handleSubmit = () => {
    // Validate individual input fields and set validity state accordingly
    const isTitleValid = title.trim() !== "";
    const isPriceValid = price.trim() !== "" && !isNaN(price);
    const isBuyerValid = buyer.trim() !== "";
    const isUserValid = users.length !== 0; // Change to users array
    setTitleValid(isTitleValid);
    setPriceValid(isPriceValid);
    setBuyerValid(isBuyerValid);
    // setForWhoValid(isForWhoValid);
    setUsersValid(isUserValid);

    // Submit logic here...
    if (isTitleValid && isPriceValid && isBuyerValid && isUserValid) {
      // Create loop that run addNewAct as many timies as is users in users array
      users.forEach((v) => addNewAct(id, buyer, title, price, v));
      navigation.navigate("Event", { id: route.params.id });
    }
  };

  const addNewAct = (eventId, buyer, title, price, recipient) => {
    const clacPrice = () => (splitOpt.id === 1 ? price / users.length : price);
    const newSubID = uuidv4();
    const newItem = {
      id: newSubID,
      name: title,
      price: clacPrice(),
      receipient: recipient,
      settle: false,
    };

    setEvents((prevEvents) => {
      return prevEvents.map((event) => {
        if (event.id === eventId) {
          const existingBuyerIndex = event.value.findIndex(
            (val) => val.buyer === buyer
          );

          if (existingBuyerIndex !== -1) {
            // If the buyer exists, update the items array for that buyer
            return {
              ...event,
              value: event.value.map((val, index) => {
                if (index === existingBuyerIndex) {
                  const existingItemIndex = val.items.findIndex(
                    (item) => item.id === newSubID
                  );
                  if (existingItemIndex === -1) {
                    // If the item doesn't exist, add it
                    return {
                      ...val,
                      items: [...val.items, newItem],
                      total: (+val.total + +clacPrice()).toString(), // Update total
                    };
                  } else {
                    // If the item exists, return the original value without modification
                    return val;
                  }
                }
                return val;
              }),
            };
          } else {
            // If the buyer doesn't exist, add a new object with the buyer
            const newActID = uuidv4();
            const newAct = {
              id: newActID,
              buyer: buyer,
              items: [newItem],
              total: clacPrice(),
            };
            return {
              ...event,
              value: [...event.value, newAct],
            };
          }
        }
        return event;
      });
    });
  };

  return (
    <View style={[stylesEvent.container, { paddingHorizontal: 16 }]}>
      {/* Set Title */}
      <View>
        <Text>Title</Text>
        <TextInput
          underlineColorAndroid="transparent"
          style={[stylesEvent.textInput, !titleValid && { borderColor: "red" }]}
          value={title}
          placeholder="Title..."
          placeholderTextColor="#BDBDBD"
          onChangeText={(newText) => setTitle(newText)}
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
        {/* Set Price */}
        <View style={{ flex: 1, position: "relative" }}>
          <Text>Price</Text>
          <TextInput
            underlineColorAndroid="transparent"
            style={[
              stylesEvent.textInput,
              !priceValid && { borderColor: "red" },
            ]}
            value={price}
            placeholder="Price..."
            keyboardType="numeric"
            placeholderTextColor="#BDBDBD"
            onChangeText={(newPrice) => setPrice(newPrice)}
          />
          <View style={stylesEvent.btnCurrency}>
            <Text style={{ color: "white" }}>{currency}</Text>
          </View>
        </View>
      </View>

      {/* How to split bill */}
      <View>
        <Text>How to split the bill</Text>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          style={stylesEvent.textInput}
          value={price}
          onPress={() => setShowOpt(!showOpt)}
        >
          <View>
            <Text>{splitOpt.text}</Text>
            <AntIcon
              name="caretdown"
              size={15}
              color="black"
              style={[
                {
                  position: "absolute",
                  right: 0,
                },
                showOpt && { transform: "rotate(180deg)" },
              ]}
            />
          </View>
        </TouchableHighlight>
        {showOpt && (
          <View style={stylesEvent.splitOptionGrp}>
            {splitOptions.map((opt, i) => (
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                key={i}
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 15,
                  borderWidth: 0.5,
                }}
                onPress={() => {
                  setShowOpt(false);
                  setSplitOpt(opt);
                }}
              >
                <Text>{opt.text}</Text>
              </TouchableHighlight>
            ))}
          </View>
        )}
      </View>
      {/* Include forWhoValid */}
      <ManyUsersInput
        id={id}
        users={users}
        setUsers={setUsers}
        usersValid={usersValid}
      />

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
