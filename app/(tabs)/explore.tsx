import { genreSearch, searchContent } from "@/api/api";
import Button from "@/components/button/Button";
import Row, { RowSkeleton } from "@/components/row/Row";
import SearchInput from "@/components/input/SearchInput";
import { Genre } from "@/types/genreTypes";
import { Skeleton } from "moti/skeleton";
import { useEffect, useState } from "react";
import { StyleSheet, Text, Platform, ScrollView, View } from "react-native";
import ScreenContainer from "@/components/screenContainer/ScreenContainer";

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
    if (text.length === 0) return;
    try {
      setLoading(true);
      setIsSearching(true);
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
    try {
      setLoading(true);
      setIsSearching(true);
      if (text) onChangeText("");
      const result = await genreSearch(genre);
      setData(result);
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
          {RowSkeleton}
          <Skeleton width={300} height={30} />
          {RowSkeleton}
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
            <Row
              title="Filmes"
              loading={loading}
              error=""
              movies={data?.movies}
              isSeries={false}
            />
          )}
          {data?.series.length > 0 && (
            <Row
              title="Séries"
              loading={loading}
              error=""
              movies={data?.series}
              isSeries={true}
            />
          )}
        </>
      );
    }
  };

  return (
    <ScreenContainer>
      <View style={{ maxWidth: 1800, width: "90%", marginHorizontal: "auto" }}>
        <SearchInput
          placeholder="Pesquise pelo nome"
          buttonTitle="Pesquisar"
          text={text}
          onChangeText={onChangeText}
          handleSearch={handleInputSearch}
        />
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.genresContainer}>
            {genres.map(({ label, value }, index) => (
              <Button
                key={index}
                title={label}
                variant=""
                icon=""
                onPress={() => setGenre(value as Genre)}
              />
            ))}
          </View>
        </ScrollView>
      </View>
      <View style={{ paddingTop: 10, paddingLeft: isWEB ? 10 : 0 }}>
        {renderAnswer()}
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
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
    display: "flex",
    flexDirection: "row",
    gap: 6,
  },
});
