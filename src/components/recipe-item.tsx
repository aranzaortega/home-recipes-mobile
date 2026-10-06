import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type RecipeItemProps = {
  description: string;
  image: ImageSourcePropType | string;
  title: string;
  prepTime?: string;
  category?: string;
};

export function RecipeItem({ description, image, title, prepTime, category }: RecipeItemProps) {
  const imageSource: ImageSourcePropType =
    typeof image === "string" ? { uri: image } : image;

  return (
    <View style={styles.container}>
      <Image
        accessibilityLabel={`${title} recipe`}
        source={imageSource}
        style={styles.image}
      />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{title}</Text>
          {category && <Text style={styles.categoryBadge}>{category}</Text>}
        </View>

        <Text numberOfLines={2} style={styles.description}>
          {description}
        </Text>

        {prepTime && (
          <Text style={styles.meta}>⏱️ Prep time: {prepTime}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e7e2da",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 12,
  },
  image: {
    width: 100,
    height: 100,
    backgroundColor: "#e7e2da",
  },
  content: {
    flex: 1,
    gap: 4,
    padding: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 8,
  },
  title: {
    flex: 1,
    color: "#24211d",
    fontSize: 16,
    fontWeight: "700",
  },
  categoryBadge: {
    backgroundColor: "#e8f2ec",
    color: "#2f6b4f",
    fontSize: 11,
    fontWeight: "600",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    overflow: "hidden",
  },
  description: {
    color: "#625d55",
    fontSize: 13,
    lineHeight: 18,
  },
  meta: {
    color: "#8a847a",
    fontSize: 12,
    marginTop: 2,
  },
});
