import { CameraView } from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import {
  AppState,
  Linking,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
} from "react-native";

export default function Scanner() {
  const qrLock = useRef(false);
  const appState = useRef(AppState.currentState);
  const router = useRouter(); // Używamy routera z expo-router

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active"
      ) {
        qrLock.current = false;
      }
      appState.current = nextAppState;
    });
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaView style={StyleSheet.absoluteFillObject}>
      {Platform.OS === "android" ? <StatusBar hidden /> : null}
      <CameraView
        style={StyleSheet.absoluteFill}
        facing="back"
        onBarcodeScanned={({ data }) => {
          if (data && !qrLock.current) {
            qrLock.current = true;
            setTimeout(async () => {
              console.log(data);

              router.push("/exercises");
            }, 500);
          }
        }}
      />
    </SafeAreaView>
  );
}
