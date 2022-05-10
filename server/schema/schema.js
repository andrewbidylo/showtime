const graphql = require('graphql')

const { GraphQLObjectType, GraphQLSctring } = graphql

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: () => ({
    id: { type: GraphQLSctring },
    name: { type: GraphQLSctring },
    genre: { type: GraphQLSctring },
  }),
})