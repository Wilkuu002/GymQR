import { CameraView } from "expo-camera";
import { Stack } from "expo-router";
import {
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function scanner() {
  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      <Stack.Screen options={{ title: "Overview", headerShown: false }} />
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={({ data }) => {
          console.log("data", data);
        }}
      ></CameraView>
    </SafeAreaView>
  );
}
