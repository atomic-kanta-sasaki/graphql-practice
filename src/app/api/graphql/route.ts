import { readFileSync } from "fs";
import { join } from "path";
import { Resolvers } from "../../apollo/__generated__/server/resolvers-types";
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { ApolloServer } from '@apollo/server';
import { PrismaClient } from "@prisma/client";
import { NextRequest } from "next/server";

const prisma = new PrismaClient();

type Context = {
  prisma: PrismaClient;
}

const typeDefs = readFileSync(
  join(process.cwd(), "/src/app/apollo/documents/schema.gql"),
  "utf-8"
);

const resolvers: Resolvers = {
  Query: {
    users: async (_: unknown, args: any, context: Context) =>  { 
      const user = await context.prisma.user.findMany({})
      const response = user.map((v) => {
        return {name: v.name, email: 'email!@example.com'}
      })
      return response;
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

const server = new ApolloServer<Context>({
  typeDefs,
  resolvers,
});


const handler = startServerAndCreateNextHandler<NextRequest, Context>(server, {
  context: async ({ req }) => ({
    req,
    prisma,
  }),
});

export { handler as GET, handler as POST };