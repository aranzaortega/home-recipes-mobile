import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

type RecipeItemProps = {
  description: string;
  image: ImageSourcePropType;
  title: string;
};

export function RecipeItem({ description, image, title }: RecipeItemProps) {
  return (
    <View style={styles.container}>
      <Image
        accessibilityLabel={`${title} recipe`}
        source={image}
        style={styles.image}
      />

      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={3} style={styles.description}>
          {description}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderColor: "#e7e2da",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    overflow: "hidden",
  },
  image: {
    alignSelf: "stretch",
    backgroundColor: "#e7e2da",
    width: 112,
  },
  content: {
    flex: 1,
    gap: 6,
    padding: 16,
  },
  title: {
    color: "#24211d",
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    color: "#625d55",
    fontSize: 14,
    lineHeight: 20,
  },
});