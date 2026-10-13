import { useCallback, useEffect, useMemo } from "react";
import { Animated, StyleSheet, Text, View } from "react-native";

type NotificationToastProps = {
  visible: boolean;
  title: string;
  message: string;
  onHide: () => void;
};

export function NotificationToast({ visible, title, message, onHide }: NotificationToastProps) {
  const slideAnim = useMemo(() => new Animated.Value(-120), []);

  const hideToast = useCallback(() => {
    Animated.timing(slideAnim, {
      toValue: -120,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      onHide();
    });
  }, [onHide, slideAnim]);

  useEffect(() => {
    if (visible) {
      Animated.spring(slideAnim, {
        toValue: 12,
        useNativeDriver: true,
        speed: 14,
        bounciness: 6,
      }).start();

      const timer = setTimeout(() => {
        hideToast();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [visible, hideToast, slideAnim]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { transform: [{ translateY: slideAnim }] }]}>
      <View style={styles.iconContainer}>
        <Text style={styles.icon}>🍳</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
        <Text numberOfLines={2} style={styles.message}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 16,
    right: 16,
    zIndex: 9999,
    backgroundColor: "#24211d",
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
    borderColor: "#3a3630",
    borderWidth: 1,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  content: {
    flex: 1,
  },
  title: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  message: {
    color: "#d8d2c9",
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
});
