import { readFileSync } from "fs";
import { join } from "path";
import { Resolvers } from "../../apollo/__generated__/server/resolvers-types";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
// import { PrismaClient } from "@prisma/client/extension";

// const prisma = new PrismaClient();

// type Context = {
//   prisma: PrismaClient;
// }

const typeDefs = readFileSync(
  join(process.cwd(), "/src/app/apollo/documents/schema.gql"),
  "utf-8"
);

const resolvers: Resolvers = {
  Query: {
    users() {
      return [{ name: "Nextjs", email:'emon@exmaple.com' }, { name: "Nuxtjs", email:'kanta@exmaple.com' }, { name: "Sveltekit", email:'satoshi@exmaple.com' }];
    },
  },
  Mutation: {
    addUser(_, { name }) {
      //prisma dbに保存する処理をここに書く      
      const email = 'emon@example.com'
      return { name, email };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


const handler = startServerAndCreateNextHandler(server);

export { handler as GET, handler as POST };