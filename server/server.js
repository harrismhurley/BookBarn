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

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Use Apollo middleware before static files middleware
  app.use('/graphql', expressMiddleware(server));

  // Serve static files in both development and production
  const staticPath = path.join(__dirname, '../client/dist');
  console.log('Serving static files from:', staticPath);

  app.use(express.static(staticPath));

  app.get('*', (req, res) => {
    const indexPath = path.join(staticPath, 'index.html');
    console.log('Sending index.html from:', indexPath);
    res.sendFile(indexPath);
  });

  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });
};

startApolloServer();
