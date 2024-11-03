import { Movie } from "@/types/movieTypes";
import { useRouter } from "expo-router";
import { MotiPressable } from "moti/interactions";
import React, { useMemo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";

type Props = { movie: Movie; isSeries: boolean };

export default function Poster({ movie, isSeries }: Props) {
  const router = useRouter();

  const onPress = () => {
    router.push({
      pathname: "/detail",
      params: {
        id: movie?.id,
        type: isSeries ? "serie" : "movie",
      },
    });
  };
  return (
    <MotiPressable
      onPress={onPress}
      animate={useMemo(
        () =>
          ({ hovered, pressed }) => {
            "worklet";

            return {
              opacity: pressed ? 0.5 : 1,
              scale: hovered ? 1.1 : 1,
            };
          },
        []
      )}
    >
      <TouchableOpacity
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
            uri: `https://image.tmdb.org/t/p/original/${
              movie?.poster_path ? movie.poster_path : movie.backdrop_path
            }`,
          }}
          style={styles.image}
        />
      </TouchableOpacity>
    </MotiPressable>
  );
}

const styles = StyleSheet.create({
  posterContainer: {
    marginRight: 12,
  },
  image: { width: 200, height: 300, borderRadius: 8 },
});
