import React, { useState, useEffect } from 'react';
import Review from './Review';
import axios from 'axios';

const ReviewsRow = ({ id, type }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const getReviews = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_BASE}/api/lists/getReviews/${type}/${id}`);
                setReviews(response.data.results);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        getReviews();
    }, [id, type]);

    return (
        <div className="h-fit w-full grid-cols-2 overflow-x-auto p-4 bg-gray-900 my-4">
            {reviews.map((review, index) => (
                <Review key={index} reviewer={review.author} text={review.content} rating={review.author_details.rating || 'N/A'} />
            ))}
        </div>
    );
};

export default React.memo(ReviewsRow);
