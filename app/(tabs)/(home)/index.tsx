import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ActivityIndicator } from "react-native";
import { useTheme } from "@react-navigation/native";

const GREETING_URL = "https://64tskkgyvb6pd337he5ubwzawpfgbqq8.app.specular.dev/api/greeting";

export default function HomeScreen() {
  const theme = useTheme();
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
// anywhere at the top of the file
const TEMP_DEBUG_URL = "http://example.com/api/debug";
console.log(TEMP_DEBUG_URL);

  useEffect(() => {
    console.log("[HomeScreen] Fetching greeting from", GREETING_URL);
    fetch(GREETING_URL)
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`HTTP ${res.status}: ${text}`);
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log("[HomeScreen] Greeting response:", data);
        setMessage(data.message);
      })
      .catch((err) => {
        console.error("[HomeScreen] Failed to fetch greeting:", err);
        setError("Failed to load greeting.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const subtitleColor = theme.dark ? "#98989D" : "#666";

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  const titleText = error ? "Welcome to Qasim" : message ?? "Welcome to Qasim";

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>
        {titleText}
      </Text>
      <Text style={[styles.subtitle, { color: subtitleColor }]}>
        Your app is currently building...
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
  },
});
