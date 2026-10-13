import Constants from "expo-constants";
import { Alert, Platform } from "react-native";

let Notifications: typeof import("expo-notifications") | null = null;

// Expo Go (SDK 53+) removed expo-notifications native module from its prebuilt client.
// We only load expo-notifications if NOT running inside Expo Go client app.
const isExpoGo = Constants.appOwnership === "expo" || Constants.executionEnvironment === "storeClient";

if (!isExpoGo) {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    Notifications = require("expo-notifications");
  } catch {
    Notifications = null;
  }
}

export async function initNotifications() {
  if (!Notifications || typeof Notifications.setNotificationHandler !== "function") {
    return;
  }

  try {
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldShowBanner: true,
        shouldShowList: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
      }),
    });

    if (Platform.OS === "android" && typeof Notifications.setNotificationChannelAsync === "function") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#2f6b4f",
      });
    }
  } catch (error) {
    console.warn("Notification handler initialization skipped:", error);
  }
}

export async function sendRecipeNotification(recipeTitle: string) {
  if (Notifications && typeof Notifications.scheduleNotificationAsync === "function") {
    try {
      const { status } = await Notifications.getPermissionsAsync();
      let finalStatus = status;
      if (status !== "granted" && typeof Notifications.requestPermissionsAsync === "function") {
        const res = await Notifications.requestPermissionsAsync();
        finalStatus = res.status;
      }

      if (finalStatus === "granted") {
        await Notifications.scheduleNotificationAsync({
          content: {
            title: "Recipe Created! 🍳",
            body: `"${recipeTitle}" has been successfully saved to your collection.`,
          },
          trigger: null,
        });
        return;
      }
    } catch (e) {
      console.warn("Could not send local notification via expo-notifications:", e);
    }
  }

  // Safe fallback for Expo Go / environments where expo-notifications is removed
  Alert.alert(
    "Recipe Created! 🍳",
    `"${recipeTitle}" has been successfully saved to your collection.`
  );
}
