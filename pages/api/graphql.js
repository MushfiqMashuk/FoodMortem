import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer, gql } from "apollo-server-micro";
import connectDB from "../../backend/config/db";
import Suggestions from "../../backend/models/Suggestions";

connectDB();

const typeDefs = gql`
  type Suggestion {
    id: ID
    productName: String!
    brandName: String!
    location: String
  }

  type Mutation {
    addSuggestion(): Suggestion
  }

  type Query {
    getBook: [Suggestion]
  }
`;
const resolvers = {
    // Query: {
    //     addSuggestion: () => ({"id": 0, "name": "Tony Stark"})
    // },

    Mutation: {
        addSuggestion: (parent, args) => {
            const suggestion = new Suggestions({
          productName: args.productName,
          brandName: args.brandName,
          location: args.location,
        });

        return suggestion.save();
        }
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