import React from "react";
import DetailPresenter from "./DetailPresenter";
import { moviesApi, tvApi } from "../../api";

export default class extends React.Component {
  constructor(props) {
    super(props);
    const {
      location: { pathname },
    } = props;
    this.state = {
      result: null,
      error: null,
      loading: true,
      isMovie: pathname.includes("/movie/"),
      sorted: null,
    };
  }

  async componentDidMount() {
    const {
      match: {
        params: { id },
      },
      history: { push },
    } = this.props;
    const { isMovie } = this.state;
    const parseId = parseInt(id);
    if (isNaN(parseId)) {
      return push("/");
    }
    let result = null;
    try {
      if (isMovie) {
        const request = await moviesApi.movieDetail(parseId);
        result = request.data;
        this.setState({ sorted: "movie" });
      } else {
        const request = await tvApi.showDetail(parseId);
        result = request.data;
        this.setState({ sorted: "show" });
      }
    } catch {
      this.setState({ error: "Can't find anything" });
    } finally {
      this.setState({ loading: false, result });
    }
  }
  render() {
    const { result, error, loading, sorted, isMovie } = this.state;
    return (
      <DetailPresenter
        result={result}
        error={error}
        loading={loading}
        sorted={sorted}
        isMovie={isMovie}
      />
    );
  }
}
