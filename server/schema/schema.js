const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLSchema, GraphQLID } = graphql

const movies = [
  { id: '1', name: 'Pulp Fiction', genre: 'Crime' },
  { id: '2', name: '1984', genre: 'Sci-Fi' },
  { id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller' },
  { id: '4', name: 'Snatch', genre: 'Crime-Comedy' },
]

const directors = [
  { id: '1', name: 'Quentin Tatantino', age: 57 },
  { id: '2', name: 'Michael Radford', age: 74 },
  { id: '3', name: 'James McTeigue', age: 53 },
  { id: '4', name: 'Guy Ritchie', age: 52 },
]

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
  }),
})

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
  }),
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(perent, args) {
        return movies.find(movie => movie.id == args.id)
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(perent, args) {
        return directors.find(director => director.id == args.id)
      },
    },

  }
})

module.exports = new GraphQLSchema({
  query: Query,
})