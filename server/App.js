const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb+srv://andrew:vbVU8RDHkpugZl3D@cluster0.dekd5.mongodb.net/showtime?retryWrites=true&w=majority')
const app = express();
const PORT = 8000;

app.use(cors())

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql:true,
}));

const dbConnection = mongoose.connection
dbConnection.on('error', err => console.log(`Connection error: ${err}`) )
dbConnection.once('open', ()=> console.log('Connected to DB!'))

app.listen(PORT, err => {
  err ? console.log(err) : console.log('Server started!');
});