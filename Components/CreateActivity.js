import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  ScrollView,
  FlatList,
} from "react-native";
import { stylesActivitie } from "../styles/style";
import { stylesEvent } from "../styles/style";
import { EventContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import AntIcon from "react-native-vector-icons/AntDesign";
import ManyUsersInput from "./ManyUsersInput";

const splitOptions = [
  { id: 1, text: "Split full price evenly" },
  { id: 2, text: "Everyone same price" },
];

const CreateActivity = ({ route, navigation }) => {
  const { events, setEvents, user, currency } = useContext(EventContext);
  const { id } = route.params;

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");

  const [buyer, setBuyer] = useState(user);
  const [showBuyerList, setShowBuyerList] = useState(false);

  // users list recipients
  const [users, setUsers] = useState([]);

  // Split options
  const [splitOpt, setSplitOpt] = useState(splitOptions[0]);
  const [showOpt, setShowOpt] = useState(false);

  // isValid
  const [titleValid, setTitleValid] = useState(true);
  const [priceValid, setPriceValid] = useState(true);
  const [buyerValid, setBuyerValid] = useState(true);
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
    const clacPrice = Number(
      splitOpt.id === 1 ? price / users.length : price
    ).toFixed(2);
    const newSubID = uuidv4();
    const newItem = {
      id: newSubID,
      name: title,
      price: clacPrice,
      receipient: recipient,
      settle: buyer === recipient ? true : false,
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
                      total: (+val.total + +clacPrice).toString(), // Update total
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
              total: clacPrice,
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

  // get all unique users from app. Users already taking part in activity show on top
  const getUniqueUsers = () => {
    const uniqueUsersSet = new Set(); // holds all unique users
    const uniqueUsersActivitySet = new Set(); // holds all unique users that are already taking part in activity
    events.forEach((event) => {
      event.value.forEach((val) => {
        if (event.id === id) uniqueUsersActivitySet.add(val.buyer);
        uniqueUsersSet.add(val.buyer);
        val.items.forEach((v) => {
          if (event.id === id) uniqueUsersActivitySet.add(v.receipient);
          uniqueUsersSet.add(v.receipient);
        });
      });
    });
    const uniqueUsersArray = Array.from(uniqueUsersSet);
    // Sort uniqueUsersArray so that users already taking part in activity show on top
    uniqueUsersArray.sort((a, b) => {
      if (uniqueUsersActivitySet.has(a) && !uniqueUsersActivitySet.has(b)) {
        return -1;
      } else if (
        !uniqueUsersActivitySet.has(a) &&
        uniqueUsersActivitySet.has(b)
      ) {
        return 1;
      } else {
        return 0;
      }
    });
    return uniqueUsersArray;
  };
  return (
    <View
      style={[stylesEvent.container, { paddingHorizontal: 16, marginTop: 10 }]}
    >
      {/* Set Title */}
      <View style={{ gap: 5, paddingTop: 5 }}>
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

      {/* Set Buyer */}

      <View style={{ gap: 5, paddingTop: 5 }}>
        <Text>Buyer</Text>
        <View style={{ position: "relative" }}>
          <TextInput
            underlineColorAndroid="transparent"
            style={[
              stylesEvent.textInput,
              !buyerValid && { borderColor: "red" },
              showBuyerList && {
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0,
              },
            ]}
            onBlur={() => {
              setShowOpt(false);
            }}
            onFocus={() => setShowBuyerList(true)}
            value={buyer}
            placeholder="Buyer..."
            placeholderTextColor="#BDBDBD"
            onChangeText={(newBuyer) => setBuyer(newBuyer)}
          />
          <TouchableHighlight
            activeOpacity={0.6}
            disabled={getUniqueUsers().length === 0}
            underlayColor="#DDDDDD"
            onPress={() => setShowBuyerList(!showBuyerList)}
            style={stylesEvent.buyerBtn}
          >
            <AntIcon
              name="caretdown"
              size={15}
              color={getUniqueUsers().length === 0 ? "#BDBDBD" : "black"}
              style={[showBuyerList && { transform: [{ rotate: "180deg" }] }]}
            />
          </TouchableHighlight>

          {/* List of users */}
          {showBuyerList && (
            <FlatList
              data={getUniqueUsers()}
              style={stylesEvent.listUsers}
              keyExtractor={(usr) => usr}
              ItemSeparatorComponent={() => (
                <View style={{ height: 1, backgroundColor: "#E0E0E0" }} />
              )}
              renderItem={({ item, index }) => (
                <TouchableHighlight
                  key={index}
                  activeOpacity={0.8}
                  underlayColor="#DDDDDD"
                  style={{
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    backgroundColor: "#F6F6F6",
                  }}
                  onPress={() => {
                    setBuyer(item);
                    setShowBuyerList(false);
                  }}
                >
                  <Text
                    style={{
                      paddingHorizontal: 3,
                      paddingVertical: 3,
                      fontSize: 16,
                      color: "#333333",
                    }}
                  >
                    {item} {user === item && "(You)"}
                  </Text>
                </TouchableHighlight>
              )}
            />
          )}
        </View>
      </View>

      {/* Set Price/split */}
      <View style={stylesEvent.setPriceGrp}>
        {/* Set Price */}
        <View style={{ position: "relative", width: "40%", gap: 5 }}>
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
        {/* How to split bill */}
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback onPress={() => setShowOpt(false)}>
            <View style={{ flex: 1, zIndex: 1, gap: 5 }}>
              <Text>How to split the bill</Text>
              <TouchableHighlight
                activeOpacity={0.6}
                underlayColor="#DDDDDD"
                style={[
                  stylesEvent.textInput,
                  showOpt && {
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                  },
                ]}
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
                      showOpt && { transform: [{ rotate: "180deg" }] },
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
                        paddingHorizontal: 10,
                        borderWidth: 1,
                        borderColor: "#E8E8E8",
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
          </TouchableWithoutFeedback>
        </View>
      </View>

      {/* Include forWhoValid */}
      <ManyUsersInput
        users={users}
        setUsers={setUsers}
        usersValid={usersValid}
        getUniqueUsers={getUniqueUsers}
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
