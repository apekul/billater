import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateAcc from "./Components/CreateAcc";

const screenHeight = Dimensions.get("window").height;

export default function App() {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <CreateAcc />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: screenHeight * 0.5,
    marginLeft: 16,
    marginRight: 16,
    marginTop: 25,
  },
});
