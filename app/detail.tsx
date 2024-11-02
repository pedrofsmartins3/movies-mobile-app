import { getMovie, getSerie } from "@/api/api";
import DetailBanner from "@/components/banner/DetailBanner";
import Button from "@/components/button/Button";
import DetailHeader from "@/components/header/DetailHeader";
import MovieDetails from "@/components/moviedetails/MovieDetails";
import VideoScreen from "@/components/videoplayer/VideoScreen";
import { Movie } from "@/types/movieTypes";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { View } from "moti";
import { Skeleton } from "moti/skeleton";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text } from "react-native";

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
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DetailHeader />
        {error ? (
          <View
            style={{
              padding: 20,
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <Text style={styles.text}>{error}</Text>
            <Button
              title="Voltar"
              variant="small"
              color="black"
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

            <View style={{ paddingHorizontal: 6, paddingTop: 8 }}>
              {loading || !movie ? (
                <Skeleton width={"100%"} height={50} />
              ) : (
                <VideoScreen isSerie={isSerie} />
              )}
            </View>
            <MovieDetails
              movie={movie}
              isLoading={loading || !movie}
              isSerie={isSerie}
            />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: "#000",
    padding: 10,
  },
  videoContainer: {
    width: "100%",
    height: 300,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: "#f00",
    textAlign: "center",
    fontWeight: 700,
  },
});
