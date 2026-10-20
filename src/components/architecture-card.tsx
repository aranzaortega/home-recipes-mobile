import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { getCurrentUser } from "../services/auth";
import { checkAndFetchOTAUpdate, getOTAInfo } from "../services/ota-updates";

export function ArchitectureCard() {
  const [expanded, setExpanded] = useState(false);
  const [isCheckingOTA, setIsCheckingOTA] = useState(false);
  const user = getCurrentUser();
  const otaInfo = getOTAInfo();

  async function handleCheckOTA() {
    setIsCheckingOTA(true);
    await checkAndFetchOTAUpdate();
    setIsCheckingOTA(false);
  }

  return (
    <View style={styles.card}>
      <Pressable onPress={() => setExpanded(!expanded)} style={styles.headerRow}>
        <View style={styles.titleContainer}>
          <Text style={styles.badgeText}>🏛️ Workshop Architecture Specs</Text>
          <Text style={styles.subtitle}>
            {expanded ? "Tap to collapse" : "SQLite DB • Offline Persistence • OTA Updates"}
          </Text>
        </View>
        <Text style={styles.arrow}>{expanded ? "▲" : "▼"}</Text>
      </Pressable>

      {expanded && (
        <View style={styles.content}>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>RN Architecture:</Text>
            <Text style={styles.specValue}>Pure Expo / Greenfield (Brownfield Isolated Compatible)</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Storage Layer:</Text>
            <Text style={styles.specValue}>SQLite Database (`expo-sqlite`) + In-Memory Cache</Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Auth Service:</Text>
            <Text style={styles.specValue}>
              {user ? `${user.name} (${user.company})` : "Logged Out"}
            </Text>
          </View>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Deployment Strategy:</Text>
            <Text style={styles.specValue}>
              EAS OTA Updates (Channel: {otaInfo.channel}, Runtime: v{otaInfo.runtimeVersion})
            </Text>
          </View>

          <Pressable
            disabled={isCheckingOTA}
            onPress={handleCheckOTA}
            style={styles.otaButton}
          >
            <Text style={styles.otaButtonText}>
              {isCheckingOTA ? "Checking OTA Channel..." : "Check for OTA Updates 🔄"}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#2f6b4f",
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#f0f7f3",
  },
  titleContainer: {
    flex: 1,
  },
  badgeText: {
    color: "#2f6b4f",
    fontSize: 14,
    fontWeight: "700",
  },
  subtitle: {
    color: "#625d55",
    fontSize: 12,
    marginTop: 2,
  },
  arrow: {
    color: "#2f6b4f",
    fontSize: 14,
    fontWeight: "700",
    marginLeft: 8,
  },
  content: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: "#e0ece4",
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 8,
  },
  specLabel: {
    color: "#24211d",
    fontSize: 12,
    fontWeight: "700",
    width: 130,
  },
  specValue: {
    flex: 1,
    color: "#524d45",
    fontSize: 12,
    textAlign: "right",
  },
  otaButton: {
    backgroundColor: "#2f6b4f",
    borderRadius: 8,
    marginTop: 6,
    paddingVertical: 8,
    alignItems: "center",
  },
  otaButtonText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
  },
});
