import { useMemo } from 'react';
import { ApolloClient, HttpLink, InMemoryCache, NormalizedCacheObject } from '@apollo/client';
import deepmerge from 'deepmerge';
import isEqual from 'lodash/isEqual'

export const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';
let __apolloClient: ApolloClient<NormalizedCacheObject>;


type f<Z> = (...args: any) => Z;

export const createApolloClient: f<ApolloClient<NormalizedCacheObject>> = () => {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: new HttpLink({
            uri: 'http://localhost:3000/graphql'
        }),
        cache: new InMemoryCache()
    });
}

export const initalizeApollo: f<ApolloClient<NormalizedCacheObject>> = initalState => {
    const $_apolloClient = __apolloClient ?? createApolloClient();

    if (initalState) {
        const existingCache = $_apolloClient.extract();

        const data = deepmerge(
            initalState,
            existingCache,
            {
                arrayMerge: (dest, src) => [...src, ...dest.filter(_ => src.every($ => isEqual(_, $)))]
            }
        );

        $_apolloClient.cache.restore(data);
    }

    return typeof window === 'undefined' ? $_apolloClient : (
        !__apolloClient ? (() => {
            __apolloClient = $_apolloClient
            return __apolloClient
        })() : __apolloClient
    );
};


export const addApolloState: f<unknown> = (client: ApolloClient<NormalizedCacheObject>, pageProps: { props?: unknown }) => {
    if (pageProps?.props) {
        pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract()
    }

    return pageProps
};

export const useApollo: f<ApolloClient<NormalizedCacheObject>>  = pageProps  => {
    const state = pageProps[APOLLO_STATE_PROP_NAME];
    const store = useMemo(() => initalizeApollo(state), [state]);
    return store;
}
