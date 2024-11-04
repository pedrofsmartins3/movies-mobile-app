import { Movie } from "@/types/movieTypes";
import { useRouter } from "expo-router";
import { MotiPressable } from "moti/interactions";
import React, { useMemo, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

type Props = { movie: Movie; isSeries: boolean };

export default function Poster({ movie, isSeries }: Props) {
  const router = useRouter();
  const [hoverd, setHovered] = useState<boolean>(false);

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
      onHoverIn={() => setHovered(true)}
      onHoverOut={() => setHovered(false)}
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
              movie?.poster_path || movie.backdrop_path || ""
            }`,
          }}
          style={styles.image}
        />
        {hoverd && (
          <View style={styles.onHover}>
            <View style={styles.hoverContent}>
              <Text style={styles.text}>
                {movie?.title || movie?.name || movie?.original_name || ""}
              </Text>
              <Text style={styles.imdb}>
                <AntDesign name="staro" size={14} color="white" />
                {movie?.vote_average.toFixed(2)}
              </Text>
              <Text style={styles.overview} numberOfLines={5}>
                {movie?.overview}
              </Text>
            </View>
          </View>
        )}
      </TouchableOpacity>
    </MotiPressable>
  );
}

const styles = StyleSheet.create({
  posterContainer: {
    marginRight: 12,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 8,
  },
  onHover: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    width: "100%",
    height: "100%",
    zIndex: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  hoverContent: {
    padding: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  text: {
    color: "rgb(255,255,255)",
    fontWeight: 700,
    fontSize: 16,
    textAlign: "center",
  },
  imdb: {
    color: "rgba(255,255,255, 0.7)",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  overview: {
    color: "rgba(255,255,255, 0.8)",
    textAlign: "justify",
    width: "90%",
    fontSize: 14,
  },
});
