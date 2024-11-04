import useDimensions from "@/hook/useDimensions";
import { commonStyles } from "@/styles/styles";
import { Movie } from "@/types/movieTypes";
import { Skeleton } from "moti/skeleton";
import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";

type Props = {
  movie: Movie | undefined;
  isLoading: boolean;
  isSerie: boolean;
};

const MovieDetails = ({ movie, isLoading = true, isSerie = false }: Props) => {
  const isWEB = Platform.OS === "web";
  const { dimensions } = useDimensions();
  const isMobile = dimensions.window.width < 480;

  //MOVIE
  const movieDate = movie?.release_date || ""; //movie
  const releasedMovieYear = new Date(movieDate).getFullYear();

  //SERIE
  const episodesNumber = movie?.number_of_episodes || 0;
  const seasons = movie?.number_of_seasons || 0;
  const serieDate = movie?.first_air_date || "";
  const releasedSerieYear = new Date(serieDate).getFullYear();

  //BOTH
  const description = movie?.overview || "";
  const views = movie?.popularity || 0;
  const imdb = movie?.vote_average || 0;
  const genres = movie?.genres || [];
  const originalContry = movie?.production_countries[0].name || "";

  const separator = (
    <Text style={[styles.text, { color: "gray", fontSize: 24 }]}>•</Text>
  );

  if (isLoading) {
    return (
      <View style={styles.content}>
        <Skeleton width={"100%"} height={100} />
        <Skeleton width={isWEB ? 500 : "100%"} height={40} />
        <Skeleton width={isWEB ? 500 : "100%"} height={40} />
        <Skeleton width={isWEB ? 500 : "100%"} height={40} />
        <Skeleton width={isWEB ? 500 : "100%"} height={40} />
      </View>
    );
  }

  return (
    <View style={styles.content}>
      <Text style={[styles.text, isWEB && !isMobile && styles.textWeb]}>
        {description}
      </Text>
      <View style={commonStyles.flexRow}>
        <Text style={[styles.text, { textAlign: "left" }]}>
          ⭐ {imdb.toFixed(2)}
        </Text>
        {separator}
        <Text style={[styles.text, { textAlign: "left" }]}>👁️ {views}</Text>
        {separator}
        <Text style={[styles.text, { textAlign: "left" }]}>
          {isSerie ? releasedSerieYear : releasedMovieYear}
        </Text>
      </View>
      {isSerie && (
        <View style={commonStyles.flexRow}>
          <Text style={[styles.text, { textAlign: "left" }]}>
            🎬 Temporadas: {seasons}
          </Text>
          {separator}
          <Text style={[styles.text, { textAlign: "left" }]}>
            🎥 Total de episódios: {episodesNumber}
          </Text>
        </View>
      )}
      <View style={commonStyles.flexRow}>
        <Text style={[styles.text, { textAlign: "left" }]}>
          {originalContry}
        </Text>
      </View>
      <View style={commonStyles.flexRow}>
        {genres.length > 0 &&
          genres.map((g: any, index: number) => (
            <Text key={index} style={[styles.text, { textAlign: "left" }]}>
              {g.name || ""}
            </Text>
          ))}
      </View>
    </View>
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    gap: 6,
    paddingHorizontal: 6,
    paddingVertical: 12,
    width: "100%",
    maxWidth: 1600,
    marginHorizontal: "auto",
  },
  title: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 30,
    maxWidth: "90%",
    fontSize: 48,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
  },
  titleWeb: {
    fontSize: 52,
  },
  text: {
    color: "#fff",
    fontSize: 16,
    textAlign: "justify",
  },
  textWeb: {
    fontSize: 22,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 16,
  },
  icon: {
    marginRight: 4,
  },
});
