import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import IconMat from "react-native-vector-icons/MaterialIcons";
import { stylesActivitie } from "../styles/style";
import { stylesEvent } from "../styles/style";

const Activities = ({ currentEvent, navigation }) => {
  // pass currentEvent.value, array of payments
  // const fakeAct = [
  //   {
  //     buyer: "John Wick",
  //     items: [
  //       {
  //         name: "Kebab",
  //         price: 20,
  //         receipient: "Micha Dzik",
  //       },
  //       {
  //         name: "Piwo",
  //         price: 30,
  //         receipient: "Jhon Doe",
  //       },
  //     ],
  //     total: 50,
  //   },
  // ];
  const groupedAct = currentEvent.value.reduce((acc, curr) => {
    const buyer = curr.buyer;
    if (!acc[buyer]) {
      acc[buyer] = [];
    }
    acc[buyer].push(curr);
    return acc;
  }, {});

  return (
    <View style={stylesActivitie.container}>
      <Text style={stylesActivitie.txtBold}>Activities:</Text>
      {/* Add event Button */}
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor="#DDDDDD"
        style={[stylesEvent.btn]}
        onPress={() => {
          return navigation.navigate("CreateActivity", { id: currentEvent.id });
        }}
      >
        <IconMat name="add-box" size={40} color="#898A8D" />
      </TouchableHighlight>

      {/* List */}
      <View style={{ gap: 10 }}>
        {Object.entries(groupedAct).map(([buyer, events], i) => (
          <View key={i}>
            <View
              style={[
                stylesActivitie.group,
                { backgroundColor: "#F6F6F6", paddingHorizontal: 5 },
              ]}
            >
              <Text style={stylesActivitie.txtBold}>{buyer}</Text>
              <Text style={stylesActivitie.txtBold}>total spent $</Text>
            </View>

            <View
              style={{
                gap: 5,
                paddingVertical: 5,
                backgroundColor: "#E8E8E8",
              }}
            >
              {events.map((event, index) => (
                <View key={index}>
                  {Object.values(event.items).map((act, j) => (
                    <View
                      key={j}
                      style={[
                        stylesActivitie.group,
                        {
                          gap: 10,
                          paddingLeft: 10,
                          paddingRight: 5,
                        },
                      ]}
                    >
                      <Text>{act.name}</Text>
                      <Text>{act.receipient}</Text>
                      <Text>${act.price}</Text>
                    </View>
                  ))}
                </View>
              ))}
              {/* {events.items.map((item, index) => (
                <View
                  key={index}
                  style={[
                    stylesActivitie.group,
                    {
                      gap: 10,
                      paddingLeft: 10,
                      paddingRight: 5,
                    },
                  ]}
                >
                  <Text>{item.name}</Text>
                  <Text>{item.receipient}</Text>
                  <Text>${item.price}</Text>
                </View>
              ))} */}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default Activities;
