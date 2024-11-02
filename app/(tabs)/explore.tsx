import { getData, requests, searchContent } from "@/api/api";
import Logo from "@/components/logo/Logo";
import SearchRow from "@/components/row/SearchRow";
import SearchInput from "@/components/search/SearchInput";
import { Genre } from "@/types/genreTypes";
import { Skeleton } from "moti/skeleton";
import { Fragment, useEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  Platform,
  ScrollView,
  View,
  TouchableOpacity,
} from "react-native";

const genres = [
  { label: "Ação", value: "action" },
  { label: "Comédia", value: "comedy" },
  { label: "Drama", value: "drama" },
  { label: "Horror", value: "horror" },
  { label: "Romance", value: "romance" },
  { label: "Fixão Científica", value: "scienceFiction" },
  { label: "Desenhos animados", value: "animated" },
  { label: "Família", value: "family" },
];

export default function TabTwoScreen() {
  const [text, onChangeText] = useState<string>("");
  const [data, setData] = useState({ movies: [], series: [] });
  const [genre, setGenre] = useState<Genre>();
  const [error, setError] = useState("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const isWEB = Platform.OS === "web";

  const handleInputSearch = async () => {
    setLoading(true);
    setIsSearching(true);
    try {
      const result = await searchContent(text);
      setData(result);
    } catch (error) {
      setError("Sem conteúdo encontrado.");
      return { series: [], movies: [] };
    } finally {
      setLoading(false);
    }
  };

  const handleGenreSearch = async (genre: Genre) => {
    setLoading(true);
    setIsSearching(true);
    if (text) onChangeText("");
    try {
      const [seriesResponse, moviesResponse] = await Promise.all([
        getData(requests[`${genre}Series`]),
        getData(requests[`${genre}Movies`]),
      ]);
      return setData({
        series: seriesResponse,
        movies: moviesResponse,
      });
    } catch (error) {
      setError("Sem conteúdo encontrado.");
      return { series: [], movies: [] };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (genre) handleGenreSearch(genre);
  }, [genre]);

  const renderAnswer = () => {
    if (!isSearching) {
      return (
        <Text style={[styles.text, { color: "#fff" }]}>
          Pesquise por nome ou escolha umas das categorias!
        </Text>
      );
    }
    if (loading) {
      return (
        <View style={{ display: "flex", gap: 16 }}>
          <Skeleton width={300} height={30} />
          <Skeleton width={"100%"} height={300} />
          <Skeleton width={300} height={30} />
          <Skeleton width={"100%"} height={300} />
        </View>
      );
    } else {
      if (error) {
        return <Text style={styles.text}>{error}</Text>;
      }
      if (data?.movies.length === 0 && data?.series.length === 0) {
        return <Text style={styles.text}>Nenhuma informação encontrada</Text>;
      }
      return (
        <>
          {data?.movies.length > 0 && (
            <>
              <Text style={styles.title}>Filmes</Text>
              <SearchRow movies={data?.movies} isSeries={false} />
            </>
          )}
          {data?.series.length > 0 && (
            <>
              <Text style={styles.title}>Séries</Text>
              <SearchRow movies={data?.series} isSeries={true} />
            </>
          )}
        </>
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isWEB && <Logo />}
        <SearchInput
          text={text}
          onChangeText={onChangeText}
          handleSearch={handleInputSearch}
        />
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={[styles.genresContainer, { paddingLeft: isWEB ? 10 : 0 }]}
        >
          {genres.map(({ label, value }, index) => (
            <TouchableOpacity
              key={index}
              style={styles.genreButton}
              onPress={() => setGenre(value as Genre)}
            >
              <Text
                style={{
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: 700,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={{ paddingTop: 10, paddingLeft: isWEB ? 10 : 0 }}>
          {renderAnswer()}
        </View>
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
  filtersWeb: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    paddingLeft: 10,
  },
  textContainer: {
    flex: 1,
    width: "100%",
    display: "flex",
    paddingLeft: 10,
  },
  title: {
    color: "#fff",
    fontSize: 32,
    textAlign: "left",
    fontWeight: "bold",
    paddingLeft: 10,
  },
  text: {
    color: "#f10000",
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
  },
  genresContainer: {
    paddingVertical: 10,
  },
  genreButton: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 12,
    backgroundColor: "gray",
    marginRight: 10,
    width: 100,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});
