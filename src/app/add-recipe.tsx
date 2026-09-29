import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function AddRecipe() {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Create a recipe</Text>

      <TextInput
        autoCapitalize="none"
        keyboardType="url"
        onChangeText={setImageUrl}
        placeholder="Picture URL"
        style={styles.input}
        value={imageUrl}
      />
      <TextInput
        onChangeText={setTitle}
        placeholder="Recipe title"
        style={styles.input}
        value={title}
      />
      <TextInput
        multiline
        numberOfLines={4}
        onChangeText={setDescription}
        placeholder="Description"
        style={[styles.input, styles.descriptionInput]}
        textAlignVertical="top"
        value={description}
      />

      <Pressable style={styles.createButton}>
        <Text style={styles.createButtonText}>Create</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f5f1",
    gap: 16,
    padding: 24,
  },
  heading: {
    color: "#24211d",
    fontSize: 28,
    fontWeight: "800",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#ffffff",
    borderColor: "#d8d2c9",
    borderRadius: 8,
    borderWidth: 1,
    color: "#24211d",
    fontSize: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  descriptionInput: {
    minHeight: 112,
  },
  createButton: {
    alignItems: "center",
    backgroundColor: "#2f6b4f",
    borderRadius: 8,
    paddingVertical: 14,
  },
  createButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});