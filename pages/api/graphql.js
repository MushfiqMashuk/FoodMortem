import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { ApolloServer, gql } from "apollo-server-micro";
import connectDB from "../../backend/config/db";
import Brands from "../../backend/models/Brands";
import Products from "../../backend/models/Products";
import Suggestions from "../../backend/models/Suggestions";

// Connect to mongodb database
connectDB();

const typeDefs = gql`
  type Suggestion {
    id: ID
    productName: String!
    brandName: String!
    location: String
  }

  type Products {
    id: ID
    name: String!
    brand: Brand
    category: Category
    img: String
    ratings: [Rating]
    reviews: [Review]
  }

  type Rating {
    id: ID
    name: String
    rating: Float!
  }

  type Review {
    id: ID
    name: String
    review: String!
    type: String!
  }

  type Category {
    id: ID
    name: String!
  }

  type Brand {
    id: ID
    name: String!
    categories: [Category]
    img: String
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

    getAllBrands: [Brand]

    getBrand(id: ID): Brand

    getAllProducts: Products
  }
`;
const resolvers = {
  Query: {
    getAllSuggestions: async () => await Suggestions.find(),
    getSuggestion: async (parent, args) => {
      const { id } = args;
      return await Suggestions.findById(id);
    },

    getAllBrands: async () => await Brands.find(),

    getBrand: async (parent, args) => {
      const { id } = args;
      return await Brands.findById(id);
    },

    getAllProducts: async () => await Products.find(),
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
  await startServer;

  await server.createHandler({
    path: "/api/graphql",
  })(req, res);
}
