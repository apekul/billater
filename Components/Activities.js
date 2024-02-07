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

const Activities = ({ activity, navigation }) => {
  const fakeAct = [
    {
      buyer: "John Wick",
      items: [
        {
          name: "Kebab",
          price: 20,
          receipient: "Micha Dzik",
        },
        {
          name: "Piwo",
          price: 30,
          receipient: "Jhon Doe",
        },
      ],
      total: 50,
    },
    {
      buyer: "Jhon Doe",
      items: [
        {
          name: "Picie",
          price: 10,
          receipient: "John Wick",
        },
      ],
      total: 10,
    },
  ];

  return (
    <View style={stylesActivitie.container}>
      <View style={stylesActivitie.header}>
        <Text style={stylesActivitie.txtBold}>Activities:</Text>
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor="#DDDDDD"
          onPress={() => {
            return navigation.navigate("CreateActivity");
          }}
        >
          <IconMat name="add-box" size={30} color="#898A8D" />
        </TouchableHighlight>
      </View>

      {/* List */}
      <View style={{ gap: 10 }}>
        {fakeAct.map((act, i) => (
          <View key={i}>
            <View
              style={[
                stylesActivitie.group,
                { backgroundColor: "#F6F6F6", paddingHorizontal: 5 },
              ]}
            >
              <Text style={stylesActivitie.txtBold}>{act.buyer}</Text>
              <Text style={stylesActivitie.txtBold}>
                total spent ${act.total}
              </Text>
            </View>

            <View
              style={{
                gap: 5,
                paddingVertical: 5,
                backgroundColor: "#E8E8E8",
              }}
            >
              {act.items.map((item, index) => (
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
              ))}
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};
export default Activities;
