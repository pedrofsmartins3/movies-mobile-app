import { getMovie, getSerie } from "@/api/api";
import DetailBanner from "@/components/banner/DetailBanner";
import Button from "@/components/button/Button";
import ScreenContainer from "@/components/screenContainer/ScreenContainer";
import MovieDetails from "@/components/moviedetails/MovieDetails";
import { Movie } from "@/types/movieTypes";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View } from "moti";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text } from "react-native";
import VideoPlayer from "@/components/videoplayer/VideoPlayer";

type Props = {};

export default function detail({}: Props) {
  const { id = 0, type = "" } = useLocalSearchParams();
  const [movie, setMovie] = useState<Movie>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const isSerie = type === "serie";
  const navigation = useNavigation();

  const fecthData = async () => {
    try {
      let result = [];
      if (type === "serie") {
        result = await getSerie(id);
      } else {
        result = await getMovie(id);
      }
      setMovie(result);
      if (error) setError("");
    } catch (error) {
      setError(
        `Dados ${isSerie ? "da série" : "do filme"} não encontrados. Escolha outro, porfavor.`
      );
    } finally {
      setLoading(false && !movie);
    }
  };

  useEffect(() => {
    if (id && type) {
      fecthData();
    }
  }, [id, type]);

  return (
    <ScreenContainer>
      {error ? (
        <View
          style={{
            padding: 20,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          {/* Mensagem de erro */}
          <Text style={styles.errorText}>{error}</Text>
          <Button
            title="Voltar"
            variant=""
            icon=""
            onPress={() => navigation.goBack()}
          />
        </View>
      ) : (
        <>
          <DetailBanner
            title={movie?.title || movie?.name || movie?.original_name || ""}
            image={movie?.backdrop_path || movie?.poster_path || ""}
            isLoading={loading || !movie}
          />
          <VideoPlayer isSerie={isSerie} loading={loading || !movie} />
          <MovieDetails
            movie={movie}
            isLoading={loading || !movie}
            isSerie={isSerie}
          />
        </>
      )}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: "#f00",
    textAlign: "center",
    fontWeight: 700,
  },
});
