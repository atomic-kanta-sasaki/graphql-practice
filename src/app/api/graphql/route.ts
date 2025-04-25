import { readFileSync } from "fs";
import { join } from "path";
import { Resolvers } from "../../apollo/__generated__/server/resolvers-types";
const typeDefs = readFileSync(
  join(process.cwd(), "/src/app/apollo/documents/schema.gql"),
  "utf-8"
);


import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';

const resolvers: Resolvers = {
  Query: {
    users() {
      return [{ name: "Nextjs" }, { name: "Nuxtjs" }, { name: "Sveltekit" }];
    },
  },
};

const server = new ApolloServer<Resolvers>({
  resolvers,
  typeDefs,
});

const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };