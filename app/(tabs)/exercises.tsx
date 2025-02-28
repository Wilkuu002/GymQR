import React, { useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Pressable,
  Modal,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import ExerciseModal from "../../components/CwiczenieComp";

interface ExerciseData {
  name: string;
  sets: string[]; // Każda seria np. "25kg x 10"
}

export default function ExercisesScreen() {
  const [exercises, setExercises] = useState<ExerciseData[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<ExerciseData | null>(
    null
  );
  const [isAddingExercise, setIsAddingExercise] = useState(false);
  const [newExerciseName, setNewExerciseName] = useState("");
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [exerciseToDelete, setExerciseToDelete] = useState<ExerciseData | null>(
    null
  );

  const addExercise = () => {
    if (newExerciseName.trim() !== "") {
      setExercises([...exercises, { name: newExerciseName.trim(), sets: [] }]);
      setNewExerciseName("");
      setIsAddingExercise(false);
    }
  };

  const updateExercise = (updatedExercise: ExerciseData) => {
    setExercises((prev) =>
      prev.map((ex) =>
        ex.name === updatedExercise.name ? updatedExercise : ex
      )
    );
  };

  const removeExercise = (exercise: ExerciseData) => {
    setExercises((prev) => prev.filter((ex) => ex.name !== exercise.name));
    setIsDeleteModalVisible(false); // Zamknięcie modala po usunięciu
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.exerciseItem}>
            <Pressable onPress={() => setSelectedExercise(item)}>
              <Text style={styles.exerciseText}>{item.name}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                setExerciseToDelete(item);
                setIsDeleteModalVisible(true);
              }}
            >
              <AntDesign name="delete" size={20} color="red" />
            </Pressable>
          </View>
        )}
      />
      <Pressable
        style={styles.addButton}
        onPress={() => setIsAddingExercise(true)}
      >
        <AntDesign name="pluscircle" size={50} color="blue" />
      </Pressable>

      <Modal visible={isAddingExercise} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Dodaj nowe ćwiczenie</Text>
          <TextInput
            style={styles.input}
            placeholder="Nazwa ćwiczenia"
            value={newExerciseName}
            onChangeText={setNewExerciseName}
          />
          <View style={styles.buttonRow}>
            <Pressable style={styles.addButtonSmall} onPress={addExercise}>
              <Text style={styles.buttonText}>Dodaj</Text>
            </Pressable>
            <Pressable
              style={styles.cancelButton}
              onPress={() => setIsAddingExercise(false)}
            >
              <Text style={styles.buttonText}>Anuluj</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Modal visible={isDeleteModalVisible} animationType="fade" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Czy na pewno chcesz usunąć to ćwiczenie?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={styles.cancelButton}
                onPress={() => setIsDeleteModalVisible(false)}
              >
                <Text style={styles.buttonText}>Anuluj</Text>
              </Pressable>
              <Pressable
                style={styles.addButtonSmall}
                onPress={() => removeExercise(exerciseToDelete!)}
              >
                <Text style={styles.buttonText}>Usuń</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Modal dla wybranego ćwiczenia */}
      <Modal visible={!!selectedExercise} animationType="slide" transparent>
        <ExerciseModal
          exercise={selectedExercise}
          onClose={() => setSelectedExercise(null)}
          onSave={updateExercise}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  exerciseItem: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    marginVertical: 5,
    borderRadius: 10,
    flexDirection: "row", // Dodajemy row, aby ikona była obok tekstu
    justifyContent: "space-between", // Wyrównanie elementów
    alignItems: "center",
  },
  exerciseText: { fontSize: 18, fontWeight: "bold", flex: 1 }, // Rozciągamy tekst ćwiczenia
  addButton: { position: "absolute", bottom: 20, right: 20 },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 20,
    marginTop: "40%",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    marginBottom: 10,
    borderRadius: 5,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  addButtonSmall: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: { color: "#fff", fontSize: 16 },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: 300,
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
});
