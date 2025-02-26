import React from "react";
import { StyleSheet } from "react-native";

import ScannerComp from "./ScannerComp";
import { Text, View } from "./Themed";

export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skaner ćwiczeń</Text>
      <ScannerComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#333",
  },
});
