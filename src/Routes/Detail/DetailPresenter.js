import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "../../Components/Loader";
import { Helmet } from "react-helmet";
import { Route, Link, Switch, withRouter } from "react-router-dom";
import Youtubes from "../Youtubes";
import Productions from "../Productions";

const Header = styled.header`
  width: 50%;
  height: 50px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background-color: rgba(20, 20, 20, 0.2);
  z-index: 10;
`;

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  padding: 50px;
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
  border-radius: 5px;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;

const Data = styled.div`
  width: 70%;
  margin-left: 10px;
`;

const Title = styled.h3`
  font-size: 32px;
  margin-bottom: 10px;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Selected = styled.div`
  width: 80px;
  height: 50px;
  text-align: center;
  border-bottom: 5px solid
    ${(props) => (props.current ? "#DB4455" : "transparent")};
`;

const Divider = styled.span`
  margin: 0px 10px;
`;

const Overview = styled.p`
  font-size: 20px;
  opacity: 0.7;
  line-height: 1.5;
  width: 50%;
  margin-bottom: 25px;
`;

const SLink = styled(Link)`
  &:hover {
    color: orange;
  }
  height: 50px;
  width: 85px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DetailPresenter = withRouter(
  ({ result, error, loading, sorted, location: { pathname } }) =>
    loading ? (
      <>
        <Helmet>
          <title>Loading | Nomfilx</title>
        </Helmet>
        <Loader />
      </>
    ) : (
      <Container>
        <Helmet>
          <title>
            {result.original_title
              ? result.original_title
              : result.original_name}{" "}
            | Nomfilx
          </title>
        </Helmet>
        <Backdrop
          bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
        />
        <Content>
          <Cover
            bgImage={
              result.poster_path
                ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                : null
            }
          />
          <Data>
            <Title>
              {result.original_title
                ? result.original_title
                : result.original_name}
            </Title>
            <ItemContainer>
              <Item>
                {result.release_date
                  ? result.release_date.substring(0, 4)
                  : result.first_air_date.substring(0, 4)}
              </Item>
              <Divider>✔</Divider>
              <Item>
                {result.runtime ? result.runtime : result.episode_run_time} min
              </Item>
              <Divider>✔</Divider>
              <Item>
                {result.genres &&
                  result.genres.map((genre, index) =>
                    index === result.genres.length - 1
                      ? genre.name
                      : `${genre.name}/ `
                  )}
              </Item>
            </ItemContainer>
            <Overview>{result.overview}</Overview>
            <Header>
              <Selected
                current={pathname === `/${sorted}/${result.id}/youtube_url`}
              >
                <SLink to={`/${sorted}/${result.id}/youtube_url`}>
                  Youtube
                </SLink>
              </Selected>
              <Selected
                current={pathname === `/${sorted}/${result.id}/production_info`}
              >
                <SLink to={`/${sorted}/${result.id}/production_info`}>
                  Production
                </SLink>
              </Selected>
            </Header>
            <Switch>
              <Route path={`/${sorted}/:id/youtube_url`} component={Youtubes} />
              <Route
                path={`/${sorted}/:id/production_info`}
                component={Productions}
              />
            </Switch>
          </Data>
        </Content>
      </Container>
    )
);

DetailPresenter.propTypes = {
  result: PropTypes.object,
  error: PropTypes.string,
  loading: PropTypes.bool.isRequired,
};

export default DetailPresenter;
