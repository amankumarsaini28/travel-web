import { useQuery, gql } from '@apollo/client';

export const CONTEXT_QUERY = gql`
query data {
    brand:getBrand {
        name,
        logo,
        logoUrl
    }
}`;

export const Header = () => {
    const { data, error, loading } = useQuery(CONTEXT_QUERY, {});

    return (
        <>
            <h2>Header</h2>
            {data && <pre>{JSON.stringify(data, undefined, '\t')}</pre>}
            {!data && <p>{loading ? 'true': 'false'}</p>}
            {error && <pre>{JSON.stringify(error, undefined, '\t')}</pre>}
        </>
    )

}