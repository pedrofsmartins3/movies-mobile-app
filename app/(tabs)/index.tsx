import { requests } from "@/api/api";
import HomeBanner from "@/components/banner/HomeBanner";
import HomeRow from "@/components/row/HomeRow";
import ScreenContainer from "@/components/screenContainer/ScreenContainer";

export default function HomeScreen() {
  return (
    <ScreenContainer>
      <HomeBanner fetchURL={requests.popularMovies} isSeries={false} />
      <HomeRow
        title="Filmes Populares"
        fetchURL={requests.popularMovies}
        isSeries={false}
      />
      <HomeRow
        title="Séries Populares"
        fetchURL={requests.popularSeries}
        isSeries={true}
      />
      <HomeRow
        title="Filmes de Ação"
        fetchURL={requests.actionMovies}
        isSeries={false}
      />
      <HomeRow
        title="Filmes de Comédia"
        fetchURL={requests.comedyMovies}
        isSeries={false}
      />
    </ScreenContainer>
  );
}
