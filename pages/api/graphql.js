import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer, gql } from "apollo-server-micro";
import connectDB from "../../backend/config/db";
import Suggestions from "../../backend/models/Suggestions";

const typeDefs = gql`
  type Suggestion {
    id: ID
    productName: String!
    brandName: String!
    location: String
  }

  input SuggestionInput {
    productName: String!
    brandName: String!
    location: String
  }

  type Mutation {
    addSuggestion(input: SuggestionInput): Suggestion
  }

  type Query {
    getAllSuggestions: [Suggestion]

    getSuggestion(id: ID): Suggestion
  }
`;
const resolvers = {
  Query: {
    getAllSuggestions: async () => await Suggestions.find(),
    getSuggestion: async (parent, args) => {
      const {id} = args;
      return await Suggestions.findById(id);
    }
  },

  Mutation: {
    addSuggestion: (parent, args) => {
      const { input } = args;
      const suggestion = new Suggestions({
        productName: input.productName,
        brandName: input.brandName,
        location: input.location,
      });

      return suggestion.save();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  plugins: [ApolloServerPluginLandingPageGraphQLPlayground()],
});

const startServer = server.start();

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  connectDB();
  await startServer;

  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
}
