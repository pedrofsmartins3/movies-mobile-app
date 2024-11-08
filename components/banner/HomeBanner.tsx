import React, { useEffect, useState } from "react";
import { getData } from "../../api/api";
import { Platform, StyleSheet, Text, View } from "react-native";
import { Skeleton } from "moti/skeleton";
import Button from "../button/Button";
import { useRouter } from "expo-router";
import useDimensions from "@/hook/useDimensions";
import BannerContainer from "./BannerContainer";

type Props = {
  fetchURL: string;
  isSeries: boolean;
};

function HomeBanner({ fetchURL = "", isSeries = false }: Props) {
  const router = useRouter();
  const { dimensions } = useDimensions();
  const isMobile = dimensions.window.width < 480;
  const isWEB = Platform.OS === "web";
  const [movie, setMovie] = useState({
    id: 0,
    backdrop_path: "",
    title: "",
    popularity: 0,
    vote_average: 0,
    release_date: 0,
    name: "",
    original_name: "",
    overview: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const fecthData = async () => {
    try {
      setLoading(true);
      const results = await getData(fetchURL);
      const randomIndex = Math.floor(Math.random() * results.length);
      setMovie(results[randomIndex]);
      if (error) setError("");
    } catch (error) {
      setError(`Erro ao carregar banner. Porfavor, recarregue a página.`);
    } finally {
      setLoading(false && !movie);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <BannerContainer
      image={movie.backdrop_path || ""}
      loading={loading || !movie?.backdrop_path}
    >
      <View style={[isWEB ? styles.contentWeb : styles.content]}>
        <Text style={[styles.title, isWEB && !isMobile && styles.titleWeb]}>
          {movie?.title || movie?.name || movie?.original_name}
        </Text>
        <Text
          style={[styles.text, isWEB && !isMobile && styles.textWeb]}
          numberOfLines={1}
        >
          {movie?.overview}
        </Text>
        <View style={styles.infoContainer}>
          <View style={styles.infoItem}>
            {loading ? (
              <Skeleton width={50} height={20} />
            ) : (
              <>
                <Text style={styles.icon}>⭐</Text>
                <Text style={[styles.text, isWEB && styles.textWeb]}>
                  {movie?.vote_average.toFixed(2)}
                </Text>
              </>
            )}
          </View>
          <View style={styles.infoItem}>
            {loading ? (
              <Skeleton width={80} height={20} />
            ) : (
              <>
                <Text style={styles.icon}>👁️</Text>
                <Text style={[styles.text, isWEB && styles.textWeb]}>
                  {movie?.popularity}
                </Text>
              </>
            )}
          </View>
          {!loading && (
            <Button
              title="Ver"
              variant=""
              icon=""
              onPress={() => {
                router.push({
                  pathname: "/detail",
                  params: {
                    id: movie?.id,
                    type: isSeries ? "serie" : "movie",
                  },
                });
              }}
            />
          )}
        </View>
      </View>
    </BannerContainer>
  );
}

export default HomeBanner;

const styles = StyleSheet.create({
  content: {
    position: "absolute",
    bottom: 12,
    left: 16,
    right: 16,
    zIndex: 30,
    maxWidth: "90%",
    display: "flex",
    gap: 16,
  },
  contentWeb: {
    position: "absolute",
    bottom: 50,
    left: 40,
    right: 20,
    zIndex: 30,
    maxWidth: "90%",
    display: "flex",
    gap: 16,
  },
  title: {
    fontSize: 48,
    fontWeight: "800",
    color: "#fff",
  },
  titleWeb: {
    fontSize: 72,
  },
  text: {
    color: "#fff",
    fontSize: 16,
  },
  textWeb: {
    fontSize: 22,
  },
  infoContainer: {
    flexDirection: "row",
    alignItems: "center",
    opacity: 0.8,
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
