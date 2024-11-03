import { getData } from "@/api/api";
import { Movie } from "@/types/movieTypes";
import { useRouter } from "expo-router";
import { Skeleton } from "moti/skeleton";
import React, { Fragment, useEffect, useState } from "react";
import {
  Image,
  Text,
  View,
  ScrollView,
  StyleSheet,
  Platform,
} from "react-native";
import Poster from "../poster/Poster";

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
                <Fragment key={index}>
                  <Poster movie={movie} isSeries={isSeries} />
                </Fragment>
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
    color: "#fff",
  },
  errorText: {
    color: "#f00",
    fontSize: 16,
  },
});
