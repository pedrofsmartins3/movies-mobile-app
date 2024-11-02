import { Movie } from "@/types/movieTypes";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Platform, ScrollView, TouchableOpacity } from "react-native";
import { StyleSheet, View } from "react-native";

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
          <TouchableOpacity
            key={index}
            style={styles.posterContainer}
            onPress={() => {
              router.push({
                pathname: "/detail",
                params: {
                  id: movie?.id,
                  type: isSeries ? "serie" : "movie",
                },
              });
            }}
          >
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original/${movie?.poster_path ? movie.poster_path : movie.backdrop_path}`,
              }}
              style={styles.image}
            />
          </TouchableOpacity>
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
