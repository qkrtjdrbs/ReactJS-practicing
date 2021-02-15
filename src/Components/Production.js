import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  font-size: 12px;
`;

const Image = styled.div`
  background-image: url(${(props) => props.bgUrl});
  width: 125px;
  height: 150px;
  background-size: cover;
  border-radius: 4px;
  background-position: center center;
`;

const ImageContainer = styled.div`
  position: relative;
  margin-bottom: 5px;
  width: 125px;
  height: 150px;
`;

const Title = styled.span`
  display: block;
  margin-bottom: 3px;
`;

const Production = ({
  id,
  imageUrl,
  title,
  rating = 0,
  year,
  isMovie = false,
}) => (
  <Container>
    <ImageContainer>
      <Image
        bgUrl={
          imageUrl
            ? `https://image.tmdb.org/t/p/w300${imageUrl}`
            : "https://d2fy2et424xkoh.cloudfront.net/blog/wp-content/uploads/2018/08/Best-Popcorn-Time-VPN-of-2017-for-Complete-Anonymity.png"
        }
      />
    </ImageContainer>
    <Title>{title.length > 18 ? `${title.substring(0, 18)}...` : title}</Title>
  </Container>
);

Production.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  rating: PropTypes.number,
  year: PropTypes.string,
  isMovie: PropTypes.bool,
};

export default Production;
