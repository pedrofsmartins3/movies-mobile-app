import { Movie } from "@/types/movieTypes";
import React, { Fragment } from "react";
import { Platform, ScrollView, StyleSheet, Text } from "react-native";
import { View } from "react-native";
import Poster from "../poster/Poster";
import { Skeleton } from "moti/skeleton";
import { MotiView } from "moti";

type Props = {
  title: string;
  movies: Movie[];
  isSeries: boolean;
  error: string;
  loading: boolean;
};

export const RowSkeleton = (
  <View style={{ display: "flex", flexDirection: "row" }}>
    {Array.from({ length: 9 }).map((_, index) => (
      <MotiView key={index} style={{ marginRight: 12 }}>
        <Skeleton width={200} height={300} />
      </MotiView>
    ))}
  </View>
);

export default function Row({
  title = "",
  movies = [],
  isSeries = false,
  error = "",
  loading = true,
}: Props) {
  const isWEB = Platform.OS === "web";

  return (
    <View style={{ paddingLeft: isWEB ? 16 : 0, paddingTop: isWEB ? 6 : 0 }}>
      {!!error ? (
        <Text style={styles.errorText}>{error}</Text>
      ) : (
        <>
          {loading ? (
            <Skeleton width={100} height={40} />
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
            {loading
              ? RowSkeleton
              : movies.map((movie, index) => (
                  <Fragment key={index}>
                    <Poster movie={movie} isSeries={isSeries} />
                  </Fragment>
                ))}
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
