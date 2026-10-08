import * as Notifications from "expo-notifications";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function AddRecipe() {
  const [imageUrl, setImageUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    async function prepareNotifications() {
      const { status } = await Notifications.getPermissionsAsync();
      if (status !== "granted") {
        await Notifications.requestPermissionsAsync();
      }
    }
    prepareNotifications();
  }, []);

  async function handleSaveRecipe() {
    if (!title.trim()) {
      Alert.alert("Missing Title", "Please enter a title for your recipe before saving.");
      return;
    }

    const recipeTitle = title.trim();

    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Recipe Created! 🍳",
          body: `"${recipeTitle}" has been successfully saved to your collection.`,
          data: { title: recipeTitle, description, imageUrl },
        },
        trigger: null,
      });
    } catch (error) {
      console.warn("Could not send push notification:", error);
    }

    // Clear form after saving
    setImageUrl("");
    setTitle("");
    setDescription("");

    Alert.alert("Success! 🌟", `Recipe "${recipeTitle}" saved! Form cleared.`);
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Create a Recipe</Text>
        <Text style={styles.subheading}>Page 3: Recipe Form</Text>
        <Text style={styles.description}>
          Fill out the details below to add a custom dish to your recipe collection.
        </Text>
      </View>

      <TextInput
        autoCapitalize="none"
        keyboardType="url"
        onChangeText={setImageUrl}
        placeholder="Picture URL (e.g. https://...)"
        placeholderTextColor="#9a948a"
        style={styles.input}
        value={imageUrl}
      />
      <TextInput
        onChangeText={setTitle}
        placeholder="Recipe title"
        placeholderTextColor="#9a948a"
        style={styles.input}
        value={title}
      />
      <TextInput
        multiline
        numberOfLines={4}
        onChangeText={setDescription}
        placeholder="Description & preparation steps..."
        placeholderTextColor="#9a948a"
        style={[styles.input, styles.descriptionInput]}
        textAlignVertical="top"
        value={description}
      />

      <Pressable onPress={handleSaveRecipe} style={styles.createButton}>
        <Text style={styles.createButtonText}>Save Recipe</Text>
      </Pressable>

      <View style={styles.navContainer}>
        <Link href="/" style={styles.secondaryButton}>
          ⬅️ Back to Page 1 (3 Recipes)
        </Link>
        <Link href="/large-list" style={styles.secondaryButton}>
          ➡️ Go to Page 2 (100 Items List)
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#f7f5f1",
    gap: 16,
    padding: 24,
  },
  header: {
    marginBottom: 4,
  },
  heading: {
    color: "#24211d",
    fontSize: 28,
    fontWeight: "800",
  },
  subheading: {
    color: "#2f6b4f",
    fontSize: 15,
    fontWeight: "700",
    marginTop: 2,
  },
  description: {
    color: "#625d55",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
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
    marginTop: 8,
  },
  createButtonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  navContainer: {
    gap: 10,
    marginTop: 16,
  },
  secondaryButton: {
    backgroundColor: "#e7e2da",
    borderRadius: 8,
    color: "#24211d",
    fontSize: 15,
    fontWeight: "700",
    paddingVertical: 12,
    textAlign: "center",
  },
});
