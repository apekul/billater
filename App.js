import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Navbar from "./Components/Navbar";

export default function App() {
  return (
    <SafeAreaView>
      <Navbar />
    </SafeAreaView>
  );
}
