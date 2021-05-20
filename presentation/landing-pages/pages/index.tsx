import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { initalizeApollo, addApolloState } from '../lib/apollo';
import { Header, CONTEXT_QUERY } from '../components/Header';
import { Reviews } from '../components/Reviews';
import gql from 'graphql-tag';

const Home: React.FC<void> = () => (
  <main>
    <h1>Hello Next</h1>
    <Header />
    <Reviews />
  </main>
);


export async function getStaticProps() {
  const apolloClient = initalizeApollo();

  await apolloClient.query({
    query: gql`
    query data {
      reviews: getReviews {
          rating
          text
      }

      brand: getBrand {
          name,
          logo,
          logoUrl
      }
    }`,
    variables: {},
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default Home;
