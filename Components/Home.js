import React from "react";
import { Text, SafeAreaView, StyleSheet } from "react-native";
const Home = ({ navigation, route }) => {
  return (
    <SafeAreaView style={styles.container}>
      <Text>{route.params.name}</Text>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16,
    marginTop: 25,
  },
});
export default Home;
