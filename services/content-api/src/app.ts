import { startApolloServer, ServerConfig } from '@travel-web/api-commons';
import { resolve } from 'path';
import { readFileSync } from 'fs';
import { brandResolver } from './resolvers/brand/resolver';
import { localeResolver } from './resolvers/locale/resolver';

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
        port: 3001,
        resolvers: mergeResolvers(brandResolver, localeResolver),
        typeDefs: schema
    };

    await startApolloServer(config);
}


main();