import { Movie } from "@/types/movieTypes";
import { useRouter } from "expo-router";
import React, { Fragment } from "react";
import { Image, Platform, ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";
import Poster from "../poster/Poster";

type Props = {
  movies: Movie[];
  isSeries: boolean;
};

export default function SearchRow({ movies = [], isSeries = false }: Props) {
  const isWEB = Platform.OS === "web";
  const router = useRouter();

  return (
    <View style={{ paddingLeft: isWEB ? 16 : 0, paddingTop: isWEB ? 6 : 0 }}>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingVertical: 15,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {movies.map((movie, index) => (
          <Fragment key={index}>
            <Poster movie={movie} isSeries={isSeries} />
          </Fragment>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 26,
    fontWeight: "800",
    textShadowColor: "rgba(100, 100, 100, 0.5)",
    textShadowOffset: { width: 0, height: 10 },
    textShadowRadius: 20,
    color: "#fff",
  },
  errorText: {
    color: "#f00",
    fontSize: 16,
  },
  posterContainer: {
    marginRight: 6,
  },
  image: { width: 200, height: 300, borderRadius: 8 },
});
