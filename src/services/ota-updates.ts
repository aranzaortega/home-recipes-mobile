import * as Updates from "expo-updates";
import { Alert } from "react-native";

export type OTAStatus = {
  isEmbedded: boolean;
  channel: string;
  updateId: string;
  runtimeVersion: string;
};

export function getOTAInfo(): OTAStatus {
  return {
    isEmbedded: Updates.isEmbeddedLaunch,
    channel: Updates.channel || "development",
    updateId: Updates.updateId ? `${Updates.updateId.substring(0, 8)}...` : "embedded-bundle",
    runtimeVersion: String(Updates.runtimeVersion || "1.0.0"),
  };
}

export async function checkAndFetchOTAUpdate(): Promise<{ updated: boolean; message: string }> {
  if (__DEV__) {
    const devMsg = "OTA Updates (EAS Update) run in Release / Production builds. In dev mode, live hot reloading is used.";
    Alert.alert("OTA Update Check", devMsg);
    return {
      updated: false,
      message: devMsg,
    };
  }

  try {
    const update = await Updates.checkForUpdateAsync();
    if (update.isAvailable) {
      await Updates.fetchUpdateAsync();
      Alert.alert(
        "Update Ready! 🚀",
        "An Over-The-Air (OTA) update has been downloaded. Reload now to apply changes?",
        [
          { text: "Later", style: "cancel" },
          { text: "Reload Now", onPress: () => Updates.reloadAsync() },
        ]
      );
      return { updated: true, message: "New update downloaded and ready to apply!" };
    }

    Alert.alert("App Up To Date", "Your app is running the latest Over-The-Air (OTA) bundle!");
    return { updated: false, message: "App is up to date! Running latest OTA bundle." };
  } catch (error) {
    console.warn("OTA update check error:", error);
    Alert.alert("OTA Notice", "OTA update check is active. Requires EAS Update channel configuration.");
    return { updated: false, message: "Could not check for OTA updates." };
  }
}
