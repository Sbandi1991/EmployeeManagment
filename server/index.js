import express from "express";
import { ApolloServer } from "apollo-server-express";

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import {} from "./model/database.js";


import { resolvers } from "./graphql/resolvers/resolver.js"; // Correctly import resolvers

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

const typeDefs = fs.readFileSync(
  path.join(__dirname, "graphql/schema/schema.graphql"),
  "utf-8"
);

const server = new ApolloServer({ typeDefs, resolvers }); // Ensure resolvers are applied

server.start().then(() => {
  server.applyMiddleware({ app, path: "/graphql", cors: true });
});

const port = process.env.PORT || 3002;



app.listen(port, () => {
  console.log(`GraphQL Server is running at http://localhost:${port}`);
});
