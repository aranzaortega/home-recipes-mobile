import { Link } from "expo-router";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { RecipeItem } from "../components/recipe-item";
import { HUNDRED_RECIPES } from "../data/recipes";

export default function LargeList() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>100 Recipes List</Text>
        <Text style={styles.subheading}>Scroll Benchmark (ScrollView + .map())</Text>
        <Text style={styles.description}>
          Rendered using ScrollView and .map() without virtualization to show the loading performance difference compared to FlashList on Page 1.
        </Text>
      </View>

      <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollContent}>
        {HUNDRED_RECIPES.map((item) => (
          <RecipeItem
            key={item.id}
            category={item.category}
            description={item.description}
            image={item.image}
            prepTime={item.prepTime}
            title={item.title}
          />
        ))}
      </ScrollView>

      <View style={styles.navContainer}>
        <Link href="/" style={styles.secondaryButton}>
          ⬅️ Back to Page 1 (3 Recipes FlashList)
        </Link>
        <Link href="/add-recipe" style={styles.primaryButton}>
          Add New Recipe Form 📝
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
    paddingTop: 16,
    paddingBottom: 20,
  },
  header: {
    marginBottom: 12,
  },
  heading: {
    color: "#24211d",
    fontSize: 26,
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
  scrollContainer: {
    flex: 1,
    marginTop: 4,
  },
  scrollContent: {
    paddingBottom: 8,
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
    paddingVertical: 12,
    textAlign: "center",
  },
  secondaryButton: {
    backgroundColor: "#e7e2da",
    borderRadius: 10,
    color: "#24211d",
    fontSize: 15,
    fontWeight: "700",
    paddingVertical: 12,
    textAlign: "center",
  },
});
