const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLID } = graphql

const movies = [
  { id: '1', name: 'Pulp Fiction', genre: 'Crime', directorId: '1' },
  { id: '2', name: '1984', genre: 'Sci-Fi', directorId: '2' },
  { id: '3', name: 'V for vendetta', genre: 'Sci-Fi-Triller', directorId: '3' },
  { id: '4', name: 'Snatch', genre: 'Crime-Comedy', directorId: '4' },
  { id: '5', name: 'Reservoir Dogs', genre: 'Crime', directorId: '1' },
  { id: '6', name: 'The Hateful Eight', genre: 'Crime', directorId: '1' },
  { id: '7', name: 'Inglourious Basterds', genre: 'Crime-Comedy', directorId: '1' },
  { id: '8', name: 'Lock, Stock and Two Smoking Barrels', genre: 'Crime-Comedy', directorId: '4' },
]

const directors = [
  { id: '1', name: 'Quentin Tatantino', age: 57 },
  { id: '2', name: 'Michael Radford', age: 74 },
  { id: '3', name: 'James McTeigue', age: 53 },
  { id: '4', name: 'Guy Ritchie', age: 52 },
]

//schemas

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    director: {
      type: DirectorType,
      resolve(perent, args) {
        return directors.find(director => director.id == perent.id)
      }
    }
  }),
})

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(perent, args) {
        return movies.filter(movie => movie.directorId === perent.id)
      },
    },
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
    movies: {
      type: new GraphQLList(MovieType),
      resolve(perent, args) {
        return mov
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(perent, args) {
        return directors
      },
    },
  }
})

module.exports = new GraphQLSchema({
  query: Query,
})