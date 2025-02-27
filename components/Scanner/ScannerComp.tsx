import { useCameraPermissions } from "expo-camera";
import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";

export default function ScannerComp() {
  const [permission, requestPermission] = useCameraPermissions();
  const isPermissionGranted = Boolean(permission?.granted);

  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={requestPermission}>
        <Text style={styles.buttonText}>Zgoda na Kamerkę</Text>
      </Pressable>

      <Link href={"/scanner"} asChild>
        <Pressable
          style={[styles.button, !isPermissionGranted && styles.disabledButton]}
          disabled={!isPermissionGranted}
        >
          <Text
            style={[
              styles.buttonText,
              { opacity: !isPermissionGranted ? 0.5 : 1 },
            ]}
          >
            Skanuj Kod
          </Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#007bff",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: "center",
    width: 200,
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#aaa",
  },
});
