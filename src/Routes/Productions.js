import React, { useState, useEffect } from "react";
import Production from "../Components/Production";
import { moviesApi, tvApi } from "../api";
import Section from "../Components/Section";

function Productions(props) {
  const {
    location: { pathname },
  } = props;

  const [result, setResult] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMovie, setIsMovie] = useState(pathname.includes("/movie/"));

  async function fetchMovie(id) {
    try {
      if (isMovie) {
        const request = await moviesApi.movieDetail(id);
        setResult(request.data);
      } else {
        const request = await tvApi.showDetail(id);
        setResult(request.data);
      }
    } catch {
      setError("Can't find anything");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = props;
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
      return push("/");
    }
    fetchMovie(parseId);
  }, []);
  console.log(result);
  return loading ? (
    "Loading...."
  ) : (
    <div>
      <Section title="Production Companies">
        {result.production_companies.map((movie) => (
          <Production
            key={movie.id}
            id={movie.id}
            title={movie.name}
            imageUrl={movie.logo_path}
            isMovie={isMovie}
          />
        ))}
      </Section>
      <Section title="Production Countries">
        {result.production_countries.map((movie) => (
          <Production
            key={movie.id}
            id={movie.id}
            title={movie.name}
            imageUrl={movie.logo_path}
            isMovie={isMovie}
          />
        ))}
      </Section>
    </div>
  );
}

export default Productions;
