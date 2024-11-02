import { getData } from "@/api/api";
import { Movie } from "@/types/movieTypes";
import { useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";
import React, { useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";

type Props = {
  fetchURL: string;
  isSeries: boolean;
  title: string;
};

export default function Row({
  fetchURL = "",
  title = "",
  isSeries = false,
}: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const isWEB = Platform.OS === "web";
  const router = useRouter();

  const fecthData = async () => {
    try {
      setLoading(true);
      const results = await getData(fetchURL);
      setMovies(results);
      if (error) setError("");
    } catch (error) {
      setError(
        `Erro ao carregar ${isSeries ? "series" : "filmes"}. Porfavor, recarregue a página.`
      );
    } finally {
      setLoading(false && !movies);
    }
  };

  useEffect(() => {
    fecthData();
  }, []);

  return (
    <View style={{ paddingLeft: isWEB ? 16 : 0, paddingTop: isWEB ? 6 : 0 }}>
      {!!error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          {loading ? (
            <Skeleton width={250} height={40} />
          ) : (
            <Text style={styles.title}>{title}</Text>
          )}
          <ScrollView
            horizontal
            contentContainerStyle={{
              paddingVertical: 15,
            }}
            showsHorizontalScrollIndicator={false}
          >
            {loading ? (
              <Skeleton width={2000} height={300} />
            ) : (
              movies.map((movie, index) => (
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
              ))
            )}
          </ScrollView>
        </>
      )}
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
