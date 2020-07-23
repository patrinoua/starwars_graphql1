import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import { StyledLink } from "./elements";

export default class StarWarsHumans extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <Query
        query={gql`
          {
            allPersons(filter: { name_contains: "${name}" }) {
              name
              id
              eyeColor
              hairColor
            }
          }
        `}
      >
        {({ loading, error, data }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :(</p>;
          return data.allPersons.map(
            ({ name, id, eyeColor, hairColor }, index) => (
              <StyledLink
                to={`person/${id}`}
                key={id}
                onClick={() => {
                  this.props.passCharacterInfo(
                    name,
                    id,
                    eyeColor || ["no"],
                    hairColor || ["no"]
                  );
                }}
              >
                {name}
              </StyledLink>
            )
          );
        }}
      </Query>
    );
  }
}
