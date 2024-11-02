import React, { useEffect, useState } from "react";
import { getData } from "../../api/api";
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Skeleton } from "moti/skeleton";
import Button from "../button/Button";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

type Props = {
  fetchURL: string;
  isSeries: boolean;
};

function Banner({ fetchURL = "", isSeries = false }: Props) {
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
  const router = useRouter();
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

  function truncate(string: string, n: number) {
    return string?.length > n ? string.substring(0, n - 1) + "..." : string;
  }

  const isWEB = Platform.OS === "web";
  return (
    <View style={[isWEB ? styles.containerWeb : styles.container]}>
      {loading ? (
        <Skeleton width={"100%"} height={isWEB ? 450 : 300} />
      ) : (
        <>
          <ImageBackground
            source={{
              uri: `https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`,
            }}
            style={styles.backgroundImage}
            imageStyle={{ resizeMode: "cover" }}
          >
            <View style={styles.topShadow}>
              <LinearGradient
                colors={["rgba(0, 0, 0, 1)", "rgba(0, 0, 0, 0)"]}
                style={styles.gradient}
              />
            </View>
            <View style={styles.leftShadow}>
              <LinearGradient
                colors={["rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 1)"]}
                style={styles.gradient}
              />
            </View>
            <View style={[isWEB ? styles.contentWeb : styles.content]}>
              <Text style={[styles.title, isWEB && styles.titleWeb]}>
                {movie?.title || movie?.name || movie?.original_name}
              </Text>
              <Text style={[styles.text, isWEB && styles.textWeb]}>
                {truncate(movie?.overview, 100)}
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
                    variant="small"
                    color="white"
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
          </ImageBackground>
        </>
      )}
    </View>
  );
}

export default Banner;

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    height: 300,
    width: "100%",
    position: "relative",
  },
  containerWeb: {
    marginVertical: 0,
    height: 450,
    width: "100%",
    position: "relative",
  },
  box: {
    width: 100,
    height: 80,
    backgroundColor: "gray",
    margin: 30,
  },
  backgroundImage: {
    height: "100%",
    width: "100%",
  },
  topShadow: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    height: "40%",
    zIndex: 10,
  },
  leftShadow: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: "100%",
    zIndex: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
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
