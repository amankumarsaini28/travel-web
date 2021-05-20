import { useQuery, gql } from '@apollo/client';

export const CONTEXT_QUERY = gql`
query data {
    reviews: getReviews {
        rating
        text
    }
}`;

export const Reviews = () => {
    const { data, error, loading } = useQuery(CONTEXT_QUERY, {});

    return (
        <>
            <h2>Review</h2>
            {data && <pre>{JSON.stringify(data, undefined, '\t')}</pre>}
            {!data && <p>{loading ? 'true' : 'false'}</p>}
            {error && <pre>{JSON.stringify(error, undefined, '\t')}</pre>}
        </>
    )

}