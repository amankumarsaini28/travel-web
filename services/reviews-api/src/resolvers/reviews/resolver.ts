import { Review } from "./Review";

const reviews: Review[] = [
    {
        rating: 5,
        text: 'good'
    },
    {
        rating: 1,
        text: 'bad'
    },
    {
        rating: 3,
        text: 'I had mixed feelings'
    }
];

const getReviews = () => reviews;

export const reviewsResolver = {
    Query: {
        getReviews
    }
};
