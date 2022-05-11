import { gql } from "@apollo/client"

export const GET_ALL_MOVIES = gql`
query moviesQuery{
  movies {
    id
    name
    genre
  }
}
`;