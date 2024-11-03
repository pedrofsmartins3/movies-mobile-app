import { Movie } from "@/types/movieTypes";
import React, { Fragment } from "react";
import { Platform, ScrollView } from "react-native";
import { View } from "react-native";
import Poster from "../poster/Poster";

type Props = {
  movies: Movie[];
  isSeries: boolean;
};

export default function SearchRow({ movies = [], isSeries = false }: Props) {
  const isWEB = Platform.OS === "web";

  return (
    <View style={{ paddingLeft: isWEB ? 16 : 0, paddingTop: isWEB ? 6 : 0 }}>
      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingVertical: 15,
        }}
        showsHorizontalScrollIndicator={false}
      >
        {movies.map((movie, index) => (
          <Fragment key={index}>
            <Poster movie={movie} isSeries={isSeries} />
          </Fragment>
        ))}
      </ScrollView>
    </View>
  );
}
