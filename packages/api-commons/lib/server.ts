import * as express from 'express';
import { ApolloServer, IResolvers } from 'apollo-server-express';
import { DocumentNode } from 'apollo-link';
import * as http from 'http';

export interface ServerConfig {
    port: number;
    typeDefs: DocumentNode | Array<DocumentNode> | string | Array<string>;
    resolvers?: IResolvers | Array<IResolvers> | any;
}

export async function startApolloServer(config: ServerConfig) {
    const {
        port,
        typeDefs,
        resolvers
    } = config;

    const app = express();

    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app })

    const httpServer = http.createServer(app);
    await new Promise(resolve => httpServer.listen(port, resolve as any));

    console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);

    return { server, app, httpServer };
}