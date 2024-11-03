import Banner from "@/components/banner/Banner";
import { requests } from "@/api/api";
import Row from "@/components/row/Row";
import ScreenContainer from "@/components/screenContainer/ScreenContainer";

export default function HomeScreen() {
  return (
    <ScreenContainer>
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
    </ScreenContainer>
  );
}
