import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

import { RecipeItem } from "../components/recipe-item";
import { THREE_RECIPES } from "../data/recipes";

export default function Index() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Home Recipes</Text>
        <Text style={styles.subheading}>Page 1: FlashList (3 Recipes)</Text>
        <Text style={styles.description}>
          This page renders 3 curated recipes using FlashList for high performance.
        </Text>
      </View>

      <View style={styles.listContainer}>
        <FlashList
          data={THREE_RECIPES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <RecipeItem
              category={item.category}
              description={item.description}
              image={item.image}
              prepTime={item.prepTime}
              title={item.title}
            />
          )}
        />
      </View>

      <View style={styles.navContainer}>
        <Link href="/large-list" style={styles.secondaryButton}>
          Page 2: See 100 Items List 🚀
        </Link>
        <Link href="/add-recipe" style={styles.primaryButton}>
          Page 3: Add New Recipe 📝
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f5f1",
    paddingHorizontal: 20,
    paddingTop: 56,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 16,
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
    marginTop: 4,
  },
  description: {
    color: "#625d55",
    fontSize: 14,
    lineHeight: 20,
    marginTop: 6,
  },
  listContainer: {
    flex: 1,
    marginTop: 8,
  },
  navContainer: {
    gap: 10,
    marginTop: 16,
  },
  primaryButton: {
    backgroundColor: "#2f6b4f",
    borderRadius: 10,
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
    paddingVertical: 14,
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "#e7e2da",
    borderRadius: 10,
    color: "#24211d",
    fontSize: 15,
    fontWeight: "700",
    paddingVertical: 14,
    textAlign: "center",
  },
});
