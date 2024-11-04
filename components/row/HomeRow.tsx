import React, { useEffect, useState } from "react";
import { getData } from "@/api/api";
import { Movie } from "@/types/movieTypes";
import Row from "./Row";

type Props = {
  fetchURL: string;
  isSeries: boolean;
  title: string;
};

export default function HomeRow({
  fetchURL = "",
  title = "",
  isSeries = false,
}: Props) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

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
    <Row
      title={title}
      movies={movies}
      isSeries={isSeries}
      error={error}
      loading={loading || !movies}
    />
  );
}
