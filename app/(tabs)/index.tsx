import { SafeAreaView, StyleSheet, Platform, ScrollView } from "react-native";
import Banner from "@/components/banner/Banner";
import { requests } from "@/api/api";
import Row from "@/components/row/Row";
import Logo from "@/components/logo/Logo";

export default function HomeScreen() {
  const isWEB = Platform.OS === "web";

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {!isWEB && <Logo />}
        <Banner fetchURL={requests.popularMovies} isSeries={false} />

        <Row
          title="Filmes Populares"
          fetchURL={requests.popularMovies}
          isSeries={false}
        />
        <Row
          title="Séries Populares"
          fetchURL={requests.popularSeries}
          isSeries={true}
        />
        <Row
          title="Filmes de Ação"
          fetchURL={requests.actionMovies}
          isSeries={false}
        />
        <Row
          title="Filmes de Comédia"
          fetchURL={requests.comedyMovies}
          isSeries={false}
        />
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
  text: {
    color: "#fff",
    fontSize: 16,
  },
});
