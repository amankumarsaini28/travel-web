import { startApolloServer, ServerConfig } from '@travel-web/api-commons';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { reviewsResolver } from './resolvers/reviews/resolver';

function mergeResolvers(...resolvers) {
    return resolvers.reduce((acc, curr) => {
        return {
            ...acc,
            ...curr,
            Query: {
                ...acc.Query,
                ...curr.Query
            },
            // Mutation: {
            //     ...acc.Mutation,
            //     ...curr.Mutation
            // }
        }
    }, {});
}

async function main() {
    const schema = readFileSync(resolve('graphql/schema.graphql'), { encoding: 'utf-8' }).toString();

    const config: ServerConfig = {
        port: 3002,
        resolvers: mergeResolvers(reviewsResolver),
        typeDefs: schema
    };

    await startApolloServer(config);
}


main();