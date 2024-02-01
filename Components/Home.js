import React from "react";
import { View, Text, SafeAreaView, StyleSheet } from "react-native";
const Home = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.list}>
        <View>
          <Text>you owe: </Text>
          <Text>$20</Text>
        </View>
        <View>
          <Text>you are owed: </Text>
          <Text>$20</Text>
        </View>
        <View>
          <Text>balance: </Text>
          <Text>$0</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft: 16,
    marginRight: 16,
    // marginTop: 25,
  },
  list: {
    backgroundColor: "red",
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
export default Home;
