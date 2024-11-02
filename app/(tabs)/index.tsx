import {
  SafeAreaView,
  StyleSheet,
  Platform,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import Banner from "@/components/banner/Banner";
import { requests } from "@/api/api";
import Row from "@/components/row/Row";
import Logo from "@/components/logo/Logo";
import Navbar from "@/components/navbar/Navbar";
import { useRef, useState } from "react";

export default function HomeScreen() {
  const isWEB = Platform.OS === "web";
  const scrollViewREF = useRef<ScrollView>(null);
  const [userScroll, setUserScroll] = useState<number>(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setUserScroll(event.nativeEvent.contentOffset.y);
  };

  return (
    <SafeAreaView style={styles.container}>
      {isWEB && <Navbar userScrollActive={userScroll} />}
      <ScrollView
        showsVerticalScrollIndicator={false}
        ref={scrollViewREF}
        onScroll={handleScroll}
      >
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
