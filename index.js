import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";

const perfils = [
  {
      id: 1,
      nome: "Comum"
  },
  {
      id: 2,
      nome: "Administrador"
  }
]

const usuarios = [
  {
      id: 1,
      nome_completo: "Breno Facanha",
      email: "breno@gmail.com",
      salario: 4500.50,
      vip: true
  },
  {
      id: 2,
      nome_completo: "Sofia Facanha",
      email: "breno@gmail.com",
      salario: 1500.50,
      vip: true
  },
  {
      id: 3,
      nome_completo: "Samara VM",
      email: "breno@gmail.com",
      salario: 7500.50,
      vip: true
  }
]

const typeDefs = gql`
  scalar DateAtual

  type Query {
    ola: String
    hora: DateAtual
    melhorUsuario: Usuario!
    melhorProduto: Produto!
    usuarios: [Usuario!]!
    usuario(id: Int!): Usuario
    perfils: [Perfil!]!
    perfil(id: Int!): Perfil
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
  }, 

  type Perfil { 
    id: Int
    nome: String
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
    },
    usuarios: () => usuarios,
    usuario: (_, args) => {
        const id = args.id;
        return usuarios.find(usuario => usuario.id === id);
    },
    perfils: () => perfils,

    perfil: (_, args) => {
      const id = args.id;
      return perfils.find(perfil => perfil.id === id);
    },
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
