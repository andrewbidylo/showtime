const graphql = require('graphql')

const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLSchema, GraphQLID, GraphQLNonNull } = graphql

const Movies = require('../models/movie')
const Directors = require('../models/director')


// const movies = [
//   { name: 'Pulp Fiction', genre: 'Crime', directorId: '1' },
//   { "name": "1984", "genre": "Sci-Fi", "directorId": "627b4ca6b49cef22af4ab8f0" },
//   { "name": "V for vendetta", "genre": "Sci-Fi-Triller", "directorId": "627b4cebb49cef22af4acfca" },
//   { "name": "Snatch", "genre": "Crime-Comedy", "directorId": "627b4d10b49cef22af4adbe3" },
//   { name: 'Reservoir Dogs', genre: 'Crime', directorId: '1' },
//   { name: 'The Hateful Eight', genre: 'Crime', directorId: '1' },
//   { name: 'Inglourious Basterds', genre: 'Crime-Comedy', directorId: '1' },
//   { "name": "Lock, Stock and Two Smoking Barrels", "genre": "Crime-Comedy", "directorId": "627b4d10b49cef22af4adbe3" },
// ]

// const directors = [
//   // {  name: 'Quentin Tatantino', age: 57 }, 627b4aa6b49cef22af4a0fb7
//   // {  "name": "Michael Radford", "age": 74 }, 627b4ca6b49cef22af4ab8f0
//   // { "name": "James McTeigue", "age": 53 }, 627b4cebb49cef22af4acfca
//   // { "name": "Guy Ritchie", "age": 52 }, 627b4d10b49cef22af4adbe3
// ]

//schemas

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    director: {
      type: DirectorType,
      resolve(perent, args) {
        return Directors.findById(perent.derectorId)
      }
    }
  }),
})

const DirectorType = new GraphQLObjectType({
  name: "Director",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(perent, args) {
        return Movies.find({ directorId: perent.id })
      },
    },
  }),
})

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addDirector: {
      type: DirectorType,
      args: {
        name: { type: new GraphQLNonNull( GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      resolve(perent, args) {
        const director = new Directors({
          name: args.name,
          age: args.age,
        })
        return director.save()
      }
    },
    addMovie: {
      type: MovieType,
      args: {
        name: { type: new GraphQLNonNull( GraphQLString) },
        genre: { type: new GraphQLNonNull( GraphQLString) },
        directorId: { type: GraphQLID },
      },
      resolve(perent, args) {
        const movie = new Movies({
          name: args.name,
          genre: args.genre,
          directorId: args.directorId,
        })
        return movie.save()
      }
    },
    deleteDirector: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(perent, args) {
        return Directors.findByIdAndRemove(args.id)
      }
    },
    deleteMovie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(perent, args) {
        return Movies.findByIdAndRemove(args.id)
      }
    },
    updateDirector: {
      type: DirectorType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull( GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },

      },
      resolve(perent, args) {
        return Directors.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name, age: args.age } },
          { new: true },
        )
      }
    },
    updateMovie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        directorId: { type: GraphQLID },

      },
      resolve(perent, args) {
        return Movies.findByIdAndUpdate(
          args.id,
          { $set: { name: args.name, genre: args.genre, directorId: args.directorId } },
          { new: true },
        )
      }
    },
  }
})

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: { id: { type: GraphQLID } },
      resolve(perent, args) {
        return Movies.findById(args.id)
      },
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLID } },
      resolve(perent, args) {
        return Directors.findById(args.id)
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve(perent, args) {
        return Movies.find({})
      },
    },
    directors: {
      type: new GraphQLList(DirectorType),
      resolve(perent, args) {
        return Directors.find({})
      },
    },
  }
})

module.exports = new GraphQLSchema({
  query: Query,
  mutation: Mutation,
})