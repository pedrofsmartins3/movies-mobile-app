import { Stack } from "expo-router";
import React from "react";
import Navbar from "@/components/navbar/Navbar";
import { View } from "react-native";

export default function TabLayout() {
  return (
    <>
      <Navbar />
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Página Inicial",
          }}
        />
        <Stack.Screen
          name="download"
          options={{
            title: "Downloads",
          }}
        />
        <Stack.Screen
          name="explore"
          options={{
            title: "Pesquisar",
          }}
        />
        <Stack.Screen
          name="profile"
          options={{
            title: "A minha coleção",
          }}
        />
      </Stack>
    </>
  );
}