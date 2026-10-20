import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { ArchitectureCard } from "../components/architecture-card";
import { RecipeItem } from "../components/recipe-item";
import { Recipe, THREE_RECIPES } from "../data/recipes";
import { getRecipesFromDatabase, initDatabase } from "../services/database";

export default function Index() {
  const [recipes, setRecipes] = useState<Recipe[]>(THREE_RECIPES);

  useEffect(() => {
    async function loadData() {
      await initDatabase();
      const dbRecipes = await getRecipesFromDatabase();
      if (dbRecipes && dbRecipes.length > 0) {
        setRecipes(dbRecipes.slice(0, 3));
      }
    }
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Home Recipes</Text>
        <Text style={styles.subheading}>Page 1: FlashList + SQLite Offline Persistence</Text>
        <Text style={styles.description}>
          Renders recipes loaded from the local SQLite database via FlashList.
        </Text>
      </View>

      <ArchitectureCard />

      <View style={styles.listContainer}>
        <FlashList
          data={recipes}
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
          Page 2: 100 Items List (ScrollView) 🚀
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
    paddingTop: 52,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 12,
  },
  heading: {
    color: "#24211d",
    fontSize: 28,
    fontWeight: "800",
  },
  subheading: {
    color: "#2f6b4f",
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  description: {
    color: "#625d55",
    fontSize: 13,
    lineHeight: 18,
    marginTop: 4,
  },
  listContainer: {
    flex: 1,
    marginTop: 4,
  },
  navContainer: {
    gap: 10,
    marginTop: 12,
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
