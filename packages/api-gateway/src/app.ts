import { ApolloServer } from 'apollo-server';
import { ApolloGateway } from '@apollo/gateway';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const supergraphSdl = readFileSync(resolve('graphql/schema.graphql'), { encoding: 'utf-8' }).toString();

const gateway = new ApolloGateway({
    supergraphSdl
});

const server = new ApolloServer({
    gateway,
    // Subscriptions are not currently supported in Apollo Federation
    subscriptions: false
});

server.listen({
    port: 90
}).then(({ url }) => {
    console.log(`🚀 Gateway ready at ${url}`);
}).catch(err => { console.error(err) });