import axios from "axios";
import { TMDB_API_KEY } from "../config";

export const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});

export const requests = {
  popularMovies: `/movie/popular?api_key=${TMDB_API_KEY}&language=pt`,
  popularSeries: `/tv/popular?api_key=${TMDB_API_KEY}&language=pt&with_networks=213`,
  topRatedMovies: `/movie/top_rated?api_key=${TMDB_API_KEY}&language=pt`,
  topRatedSeries: `/tv/top_rated?api_key=${TMDB_API_KEY}&language=pt`,

  // Gêneros de Filmes
  actionMovies: `/discover/movie?api_key=${TMDB_API_KEY}&language=pt&with_genres=28`,
  comedyMovies: `/discover/movie?api_key=${TMDB_API_KEY}&language=pt&with_genres=35`,
  dramaMovies: `/discover/movie?api_key=${TMDB_API_KEY}&language=pt&with_genres=18`,
  horrorMovies: `/discover/movie?api_key=${TMDB_API_KEY}&language=pt&with_genres=27`,
  romanceMovies: `/discover/movie?api_key=${TMDB_API_KEY}&language=pt&with_genres=10749`,
  scienceFictionMovies: `/discover/movie?api_key=${TMDB_API_KEY}&language=pt&with_genres=878`,
  animatedMovies: `/discover/movie?api_key=${TMDB_API_KEY}&language=pt&with_genres=16`,
  documentaries: `/discover/movie?api_key=${TMDB_API_KEY}&language=pt&with_genres=99`,
  familyMovies: `/discover/movie?api_key=${TMDB_API_KEY}&language=pt&with_genres=10751`,

  // Gêneros de Séries
  actionSeries: `/discover/tv?api_key=${TMDB_API_KEY}&language=pt&with_genres=10759`,
  comedySeries: `/discover/tv?api_key=${TMDB_API_KEY}&language=pt&with_genres=35`,
  dramaSeries: `/discover/tv?api_key=${TMDB_API_KEY}&language=pt&with_genres=18`,
  horrorSeries: `/discover/tv?api_key=${TMDB_API_KEY}&language=pt&with_genres=27`,
  romanceSeries: `/discover/tv?api_key=${TMDB_API_KEY}&language=pt&with_genres=10749`,
  scienceFictionSeries: `/discover/tv?api_key=${TMDB_API_KEY}&language=pt&with_genres=10765`,
  familySeries: `/discover/tv?api_key=${TMDB_API_KEY}&language=pt&with_genres=10751`,
  animatedSeries: `/discover/tv?api_key=${TMDB_API_KEY}&language=pt&with_genres=16`,
};

export const getData = async (request) => {
  try {
    const response = await api.get(request);
    return response.data.results;
  } catch (error) {
    console.error("Erro ao carregar informações:", error);
    throw error;
  }
};

export const getMovie = async (movieId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}?api_key=${TMDB_API_KEY}&language=pt-PT`
  );
  return response.data;
};

export const getSerie = async (tvId) => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=${TMDB_API_KEY}&language=pt-PT`
  );
  return response.data;
};

export const searchContent = async (query) => {
  try {
    const [seriesResponse, moviesResponse] = await Promise.all([
      axios.get(
        `https://api.themoviedb.org/3/search/tv?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=pt-PT`
      ),
      axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}&language=pt-PT`
      ),
    ]);

    const series = seriesResponse.data.results;
    const movies = moviesResponse.data.results;

    return {
      series,
      movies,
    };
  } catch (error) {
    return { series: [], movies: [] };
  }
};

export const genreSearch = async (genre) => {
  try {
    const [seriesResponse, moviesResponse] = await Promise.all([
      getData(requests[`${genre}Series`]),
      getData(requests[`${genre}Movies`]),
    ]);
    return {
      series: seriesResponse,
      movies: moviesResponse,
    };
  } catch (error) {
    return { series: [], movies: [] };
  } finally {
  }
};
