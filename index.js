import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";

const typeDefs = gql`
  scalar DateAtual

  type Query {
    ola: String
    hora: DateAtual
    melhorUsuario: Usuario!
    melhorProduto: Produto!
  },
  type Usuario {
    id: Int
    nome: String
    email: String
    salario: Float
    vip: Boolean
  },

  type Produto {
    id: Int
    nome: String
    preco: Float
    desconto: Float
    precoComDesconto: Float 
  }
`;

const resolvers = {
  Query: {
    ola: () => "Olá !",
    hora: () => new Date().toLocaleString(),
    melhorUsuario: () => {
        return {
            id: 1,
            nome_completo: "Breno Facanha",
            email: "breno@gmail.com",
            salario: 4500.50,
            vip: true
        }
    },
    melhorProduto: () => {
        return {
            id: 1,
            nome: "Smartphone",
            preco: 2500.00,
            desconto: 0.10
        }
    }
  },
  Usuario: {
    nome(usuario){
      console.log(usuario);
      return usuario.nome_completo;
    }
  },
  Produto: {
    precoComDesconto(produto){
      const desconto = produto.preco * produto.desconto;
      return produto.preco - desconto;
    }
  }
};

const servidor = new ApolloServer({ typeDefs, resolvers });
const { url } = await startStandaloneServer(servidor);

console.log(`Servidor rodando em: ${url}`);
