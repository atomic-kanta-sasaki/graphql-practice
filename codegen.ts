import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/app/apollo/documents/**/*.gql",
  documents: ["./src/app/apollo/documents/**/*.gql"],
  generates: {
    "./src/app/apollo/__generated__/client/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
    "./src/app/apollo/__generated__/server/resolvers-types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
