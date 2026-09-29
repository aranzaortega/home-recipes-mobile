import { StyleSheet, Text, View } from "react-native";

import { RecipeItem } from "../components/recipe-item";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Home Recipes</Text>
      <Text style={styles.introduction}>
        Simple dishes worth making again.
      </Text>

      <RecipeItem
        description="A bright, comforting pasta with ripe tomatoes, fresh basil, and a little parmesan."
        image={{
          uri: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?auto=format&fit=crop&w=400&q=80",
        }}
        title="Tomato Basil Pasta"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f5f1",
    paddingHorizontal: 24,
    paddingTop: 48,
  },
  heading: {
    color: "#24211d",
    fontSize: 32,
    fontWeight: "800",
  },
  introduction: {
    color: "#625d55",
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 28,
    marginTop: 8,
  },
});
