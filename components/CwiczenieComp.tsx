import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  FlatList,
} from "react-native";

interface Props {
  exercise: { name: string; sets: string[] } | null;
  onClose: () => void;
  onSave: (updatedExercise: { name: string; sets: string[] }) => void;
}

export default function ExerciseModal({ exercise, onClose, onSave }: Props) {
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");
  const [sets, setSets] = useState<string[]>(exercise?.sets || []);

  const addSet = () => {
    if (weight && reps) {
      const newSet = `${weight}kg x ${reps}`;
      setSets([...sets, newSet]);
      setWeight("");
      setReps("");
    }
  };

  const removeSet = (index: number) => {
    const updatedSets = sets.filter((_, i) => i !== index);
    setSets(updatedSets);
  };

  const saveExercise = () => {
    if (exercise) {
      onSave({ ...exercise, sets });
      onClose();
    }
  };

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.modalTitle}>{exercise?.name}</Text>
      <FlatList
        data={sets}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.setItem}>
            <Text style={styles.setText}>{item}</Text>
            <Pressable
              onPress={() => removeSet(index)}
              style={styles.deleteButton}
            >
              <Text style={styles.buttonText}>🗑️</Text>
            </Pressable>
          </View>
        )}
      />
      <TextInput
        style={styles.input}
        placeholder="Ciężar (kg)"
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />
      <TextInput
        style={styles.input}
        placeholder="Powtórzenia"
        keyboardType="numeric"
        value={reps}
        onChangeText={setReps}
      />

      <Pressable style={styles.addButton} onPress={addSet}>
        <Text style={styles.buttonText}>Dodaj serię</Text>
      </Pressable>
      <View style={styles.buttonRow}>
        <Pressable style={styles.saveButton} onPress={saveExercise}>
          <Text style={styles.buttonText}>Zapisz</Text>
        </Pressable>
        <Pressable style={styles.cancelButton} onPress={onClose}>
          <Text style={styles.buttonText}>Zamknij</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginHorizontal: 20,
    marginTop: "40%",
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "100%",
    marginVertical: 5,
    borderRadius: 5,
  },
  setItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginVertical: 5,
    width: "100%",
  },
  setText: { fontSize: 18 },
  deleteButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  saveButton: {
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
});
