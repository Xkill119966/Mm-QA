import React from "react";
import Flex from "./Flex";
import styled from "styled-components";
import EmptyList from "../assets/images/hugo-list-is-empty.png";
import NotFound from "../assets/images/hugo-page-not-found.png";
import FatalError from "../assets/images/hugo-fatal-error.png";
import F from "../"
const IllustrationWrapper = styled.div`
  .flex__container {
    width: 100%;
    text-align: center;
  }
  .img-container {
    width: 55%;
    position: relative;
    height: 0;
    overflow: hidden;
    padding-bottom: 40%;
    margin: auto;

    @media screen and (${p => p.theme.media.mobile}) {
      padding-bottom: 75%;
      width: 100%;
    }
  }

  .img-container img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
`;

const IllustrationType = ({ image, message, defaultMessage }) => (
  <>
    <div className="img-container">
      <img className="illustration" src={image} alt="" />
    </div>
    <h2>{message || defaultMessage}</h2>
  </>
);

const illustrationTypes = {
  empty: ({ message }) => (
    <IllustrationType
      image={EmptyList}
      message={message}
      defaultMessage={"Such Empty"}
    />
  ),
  "not-found": ({ message }) => (
    <IllustrationType
      image={NotFound}
      message={message}
      defaultMessage={"Oops, not found"}
    />
  ),
  error: ({ message }) => (
    <IllustrationType
      image={FatalError}
      message={message}
      defaultMessage={"Something went crazy!"}
    />
  )
};

export const Illustration = ({ type, message }) => (
  <IllustrationWrapper>
    <Flex className="flex__container" align="center">
      <div style={{ width: "100%" }}>
        {illustrationTypes[type]({ message })}
        <span className="color--gray">Illustration by https://icons8.com</span>
      </div>
    </Flex>
  </IllustrationWrapper>
);

export default Illustration;
