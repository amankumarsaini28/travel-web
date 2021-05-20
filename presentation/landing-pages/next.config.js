module.exports = {
    rewrites: async () => [
        {
            source: '/graphql',
            destination: 'http://localhost:90/graphql',
        },
    ]
}
