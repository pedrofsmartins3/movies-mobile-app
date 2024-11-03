import { Stack } from "expo-router";
import React from "react";

export default function TabLayout() {
  return (
    <>
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
