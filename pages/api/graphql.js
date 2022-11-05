import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer, gql } from "apollo-server-micro";

const typeDefs = gql`
  type Book {
    id: ID!
    name: String
  }
  type Query {
    getBook: Book
  }
`;
const resolvers = {
    Query: {
        getBook: () => ({"id": 0, "name": "Tony Stark"})
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    plugins: [ApolloServerPluginLandingPageGraphQLPlayground()]
});

const startServer = server.start();

export const config = {
    api: {
        bodyParser: false,
    }
}

export default async function handler(req, res) {

    await startServer;

    await server.createHandler({
        path: "/api/graphql"
    })(req, res);
}