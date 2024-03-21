import React, { useContext, useLayoutEffect, useState } from "react";
import { Text, View, SafeAreaView, TouchableOpacity } from "react-native";
import moment from "moment";
import { EventContext } from "../context";
import { stylesEvent } from "../styles/style";
import Activities from "./Activities";
import IconSetting from "react-native-vector-icons/Ionicons";
import SettingsEvent from "./SettingsEvent";

const Event = ({ route, navigation }) => {
  const { events, currency } = useContext(EventContext);
  const { id } = route.params;
  const currentEvent = events.find((e) => e.id === id);
  const [showSettings, setShowSettings] = useState(false);

  const calculateTotalSum = () => {
    const totalSum = currentEvent?.value.reduce((acc, curr) => {
      acc += +curr.total;
      return acc;
    }, 0);

    return totalSum?.toFixed(2);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ flexDirection: "row", gap: 10 }}
          onPress={() => setShowSettings((prev) => !prev)}
        >
          {showSettings && <Text style={{ color: "white" }}>Cancel</Text>}
          <IconSetting
            name={showSettings ? "close-sharp" : "settings-sharp"}
            size={20}
            color="white"
            style={{ marginRight: 20 }}
            onPress={() => setShowSettings((prev) => !prev)}
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, showSettings]);

  return (
    <SafeAreaView style={[stylesEvent.container]}>
      {/* Settings */}
      {showSettings && (
        <SettingsEvent
          navigation={navigation}
          currentEvent={currentEvent}
          setShowSettings={setShowSettings}
        />
      )}
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "flex-end",
            backgroundColor: "#4a69bd",
            paddingBottom: 10,
          }}
        >
          <View
            style={{
              paddingHorizontal: 16,
            }}
          >
            <Text style={[stylesEvent.txtLight, { fontSize: 20 }]}>
              {currentEvent?.title ? currentEvent?.title : "No title"}
            </Text>
            <Text style={stylesEvent.txtLight}>
              {moment(currentEvent?.date).format("MMMM Do YYYY")}
            </Text>
          </View>
          <View
            style={{
              paddingHorizontal: 16,
              flex: 1,
              alignItems: "flex-end",
            }}
          >
            <Text style={[stylesEvent.txtLight, { fontSize: 20 }]}>
              {calculateTotalSum()} {currency}
            </Text>
            <Text style={[stylesEvent.txtLight]}>Total money spend</Text>
          </View>
        </View>
        {currentEvent !== undefined && (
          <Activities currentEvent={currentEvent} navigation={navigation} />
        )}
      </View>
    </SafeAreaView>
  );
};
export default Event;
