import styled from "styled-components";
import { Link } from "react-router-dom";

export const AppContainer = styled.div`
  font-family: sans-serif;
  padding: 5vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const NavigationMenu = styled.div`
  display: flex;
  font-family: "Raleway", sans-serif;
  font-weight: 900;
`;
export const NavigationLink = styled(Link)`
  margin: 10px;
  text-decoration: none;
  color: black;
  padding-right: 2vw;
  &:hover {
    color: red;
  }
`;
export const SearchBarContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 700px) {
    width: auto;
    margin: 5px;
  }
`;
export const SearchBar = styled.input`
  width: 150px;
  margin: 5px;
  padding: 5px;
  font-size: 13px;
  &:focus {
    outline: none;
  }
`;
export const StyledLink = styled(Link)`
  text-decoration: none;
  margin-left: 10px;
  color: black;
  display: block;
  margin-top: 10px;
  padding: 5px 0;
  font-family: "Raleway", sans-serif;
  &:hover {
    background: yellow;
    color: blue;
    font-weight: 700;
    font-size: 20px;
  }
`;
export const H1 = styled.h1`
  font-size: 50px;
  text-align: center;
  font-family: "Raleway", sans-serif;
  font-weight: 900;
`;
