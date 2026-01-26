import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    ola: String
  }
`;

const resolvers = {
  Query: {
    ola: () => "Olá, mundo!",
  },
};



const servidor = new ApolloServer({typeDefs, resolvers});
const { url } = await startStandaloneServer(servidor);

console.log(`Servidor rodando em: ${url}`);