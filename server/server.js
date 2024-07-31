const express = require('express');
const path = require('path');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');

const app = express();
const PORT = process.env.PORT || 3001;

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Defines an asynchronous function to start the Apollo server
const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
  }

  // Uses Apollo's express middleware to handle GraphQL requests at the /graphql endpoint
  app.use('/graphql', expressMiddleware(server));

  // Starts the server once the database connection is open
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

// Calls the startApolloServer function to initialize the server
startApolloServer();





// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

// // if we're in production, serve client/build as static assets
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../client/build')));
// }

// app.use(routes);

// db.once('open', () => {
//   app.listen(PORT, () => console.log(`🌍 Now listening on localhost:${PORT}`));
// });
