import React, { useState, useEffect } from "react";
import Season from "../Components/Season";
import Section from "../Components/Section";
import { moviesApi, tvApi } from "../api";

function Seasons(props) {
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
  return loading ? (
    "Loading...."
  ) : (
    <div>
      <Section title="Seasons">
        {result.seasons.map((season) => (
          <Season
            key={season.id}
            imageUrl={season.poster_path}
            title={season.name}
            episodes={season.episode_count}
          />
        ))}
      </Section>
    </div>
  );
}

export default Seasons;
