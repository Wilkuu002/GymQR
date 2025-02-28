import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import ScannerComp from "@/components/Scanner/ScannerComp";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Skaner</Text>
      <Text>Wyraź zgodę na korzystanie z kamerki aby zeskanować kod QR</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <ScannerComp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
