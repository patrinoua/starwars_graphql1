import React from "react";

import { ApolloProvider, Query } from "react-apollo";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { InMemoryCache } from "apollo-cache-inmemory";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";
import { About } from "./about";
import { pathOr } from "ramda";
import StarWarsHumans from "./StarWarsHumans";
import {
  AppContainer,
  NavigationMenu,
  SearchBarContainer,
  SearchBar,
  NavigationLink,
  StyledLink,
  H1
} from "./elements";

const apolloClient = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.graphcms.com/simple/v1/swapi"
  }),
  cache: new InMemoryCache()
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      submitted: false,
      characterName: "",
      characterId: "",
      eyeColor: [],
      hairColor: [],
      appHistory: []
    };
    this.passCharacterInfo = this.passCharacterInfo.bind(this);
  }
  passCharacterInfo = (characterName, characterId, eyeColor, hairColor) => {
    this.setState({
      characterName,
      characterId,
      eyeColor: eyeColor.join("/"),
      hairColor: hairColor.join("/"),
      appHistory: [
        {
          characterName,
          characterId,
          eyeColor,
          hairColor
        },
        ...this.state.appHistory
      ]
    });
  };
  handleChange = e => {
    this.setState({
      inputText: e.target.value
    });
  };
  render() {
    const {
      submitted,
      characterName,
      appHistory,
      eyeColor,
      hairColor
    } = this.state;
    const Character = () => (
      <React.Fragment>
        <h3>{characterName}</h3>
        {characterName} has {eyeColor.toLowerCase()} eyes and{" "}
        {hairColor.toLowerCase()} hair.
      </React.Fragment>
    );
    return (
      <ApolloProvider client={apolloClient}>
        <AppContainer>
          <About />
          <H1>Star Wars GraphQL API</H1>
          <BrowserRouter>
            <React.Fragment>
              <NavigationMenu>
                <NavigationLink to={"/"}> Search </NavigationLink>
                <NavigationLink to={"/history"}> History </NavigationLink>
              </NavigationMenu>
              <br />
              <Route
                exact
                path="/"
                render={() => (
                  <React.Fragment>
                    <SearchBarContainer>
                      <SearchBar
                        id="searchbar"
                        type="text"
                        name="search"
                        placeholder="Enter a name"
                        onChange={this.handleChange}
                      />
                      <input
                        type="submit"
                        onClick={() => {
                          this.setState({
                            submitted: true
                          });
                        }}
                      />
                    </SearchBarContainer>
                    {submitted && (
                      <StarWarsHumans
                        name={this.state.inputText}
                        passCharacterInfo={this.passCharacterInfo}
                      />
                    )}
                  </React.Fragment>
                )}
              />
              <Route
                exact
                path="/person/:id"
                render={() => (
                  <React.Fragment>
                    {characterName.length > 0 ? Character() : "No results"}
                  </React.Fragment>
                )}
              />
              <Route
                exact
                path="/history"
                render={() => {
                  return appHistory.map(
                    ({ id, characterName }, index) =>
                      index < 5 && (
                        <StyledLink to={`person/${id}`} key={id}>
                          {characterName}
                        </StyledLink>
                      )
                  );
                }}
              />
            </React.Fragment>
          </BrowserRouter>
        </AppContainer>
      </ApolloProvider>
    );
  }
}

export { App };
