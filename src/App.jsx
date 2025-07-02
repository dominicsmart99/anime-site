import { use, useEffect, useState } from "react";
import { useDebounce } from "react-use";
import Search from "./components/Search";
import Spinner from "./components/Spinner";
import Card from "./components/Card";

const App = () => {
  const [animeList, setAnimeList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const fetchAnime = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch(
        "https://api.jikan.moe/v4/seasons/now?filter=tv&limit=20"
      );
      if (!response.ok) {
        throw new Error("Failed to fetch anime data");
      }
      const data = await response.json();
      const uniqueAnime = Array.from(
        new Map(
          (data.data || []).map((anime) => [anime.mal_id, anime])
        ).values()
      );
      setAnimeList(uniqueAnime);
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error fetching anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useDebounce(
    () => {
      setDebouncedSearchTerm(searchTerm);
    },
    500,
    [searchTerm]
  );
  const searchAnime = async (query = "") => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      if (query.trim().length >= 3) {
        const response = await fetch(
          `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(
            query
          )}&limit=20`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch anime data");
        }
        const data = await response.json();
        const uniqueAnime = Array.from(
          new Map(
            (data.data || []).map((anime) => [anime.mal_id, anime])
          ).values()
        );
        setAnimeList(uniqueAnime);
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error("Error fetching anime:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAnime();
  }, []);

  useEffect(() => {
    searchAnime(debouncedSearchTerm);
  }, [debouncedSearchTerm]);
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Anime</span> You'll Enjoy
            Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2 className="mt-[40px]">Currently Airing</h2>
          {isLoading && (
            <div className="w-full flex justify-center">
              <Spinner />
            </div>
          )}
          {errorMessage && !isLoading && (
            <p className="text-red-500">{errorMessage}</p>
          )}
          {Array.isArray(animeList) && !isLoading && (
            <ul>
              {animeList.map((anime) => (
                <Card key={anime.mal_id} anime={anime} />
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
};

export default App;
