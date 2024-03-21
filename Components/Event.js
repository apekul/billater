import React, { useContext, useLayoutEffect, useState } from "react";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import moment from "moment";
import { EventContext } from "../context";
import { stylesEvent } from "../styles/style";
import Activities from "./Activities";
import MateralCIcon from "react-native-vector-icons/MaterialCommunityIcons";
import IconMat from "react-native-vector-icons/MaterialIcons";
import IconSetting from "react-native-vector-icons/Ionicons";
import SettingsEvent from "./SettingsEvent";
import EventSummary from "./EventSummary";

const Event = ({ route, navigation }) => {
  const { events, currency } = useContext(EventContext);
  const { id } = route.params;
  const currentEvent = events.find((e) => e.id === id);
  const [showSettings, setShowSettings] = useState(false);
  const [tabDisplay, setTabDisplay] = useState(true);

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

        {/* Tab options */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity
            style={[
              stylesEvent.tabGrp,
              { backgroundColor: tabDisplay ? "#8395a7" : "white" },
            ]}
            onPress={() => setTabDisplay(true)}
          >
            <Text style={{ color: tabDisplay ? "white" : "black" }}>
              Activities
            </Text>
          </TouchableOpacity>
          <View
            style={{
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderColor: "black",
              height: "100%",
            }}
          />
          <TouchableOpacity
            style={[
              stylesEvent.tabGrp,
              { backgroundColor: !tabDisplay ? "#8395a7" : "white" },
            ]}
            onPress={() => setTabDisplay(false)}
          >
            <Text style={{ color: !tabDisplay ? "white" : "black" }}>
              Summary
            </Text>
          </TouchableOpacity>
        </View>

        {tabDisplay
          ? currentEvent !== undefined && (
              <Activities currentEvent={currentEvent} navigation={navigation} />
            )
          : currentEvent.value.length > 0 && (
              <EventSummary currentEvent={currentEvent} />
            )}

        {/* Add Button */}
        <View
          style={{
            position: "absolute",
            bottom: 5,
            right: 5,
          }}
        >
          {/* Arrow pointing at Add button */}
          {currentEvent.value.length <= 0 && (
            <View
              style={{
                position: "absolute",
                bottom: 70,
                right: 80,
                flexDirection: "row",
              }}
            >
              <Text
                style={{
                  backgroundColor: "lightgray",
                  padding: 5,
                  borderRadius: 10,
                }}
              >
                Press button to add new Activity to the Event
              </Text>
              <MateralCIcon name="arrow-down-right" size={60} color="#5DB075" />
            </View>
          )}

          {/* Add new Act */}
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="transparent" // Make underlay color transparent
            onPress={() => {
              return navigation.navigate("CreateActivity", {
                id: currentEvent.id,
              });
            }}
          >
            <View
              style={{
                position: "relative",
                alignItems: "center",
              }}
            >
              <IconMat
                name="add-box"
                size={90}
                color="#5DB075"
                style={{
                  zIndex: 1,
                }}
              />
              <View
                style={{
                  width: 60,
                  height: 60,
                  top: 15,
                  backgroundColor: "white",
                  position: "absolute",
                }}
              ></View>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default Event;
