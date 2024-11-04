import { Tabs } from "expo-router";
import React from "react";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Platform, StyleSheet } from "react-native";

export default function TabLayout() {
  const isWEB = Platform.OS === "web";

  const styles = StyleSheet.create({
    tabBar: {
      backgroundColor: "#000",
      height: isWEB ? 50 : 100,
    },
    tabBarLabel: {
      fontSize: 12,
      color: "#fff",
    },
  });

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Página Inicial",
            headerTitleStyle: { color: "#fff" },
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "home" : "home-outline"}
                color="#fff"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="download"
          options={{
            title: "Downloads",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "download" : "download-outline"}
                color="#fff"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: "Pesquisar",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "search" : "search-outline"}
                color="#fff"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "A minha coleção",
            tabBarIcon: ({ focused }) => (
              <TabBarIcon
                name={focused ? "person" : "person-outline"}
                color="#fff"
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
