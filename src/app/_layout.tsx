import { Stack } from "expo-router";
import { useEffect } from "react";

import { initNotifications } from "../utils/notifications";

export default function RootLayout() {
  useEffect(() => {
    initNotifications();
  }, []);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#f7f5f1",
        },
        headerTintColor: "#24211d",
        headerTitleStyle: {
          fontWeight: "700",
        },
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="large-list" options={{ title: "Page 2: 100 Recipes" }} />
      <Stack.Screen name="add-recipe" options={{ title: "Page 3: Add Recipe" }} />
    </Stack>
  );
}
