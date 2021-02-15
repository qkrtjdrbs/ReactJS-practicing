import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ReactPlayer from "react-player";

const Youtube = ({ video }) => (
  <ReactPlayer url={`https://www.youtube.com/watch?v=${video.key}`} controls />
);

export default Youtube;
