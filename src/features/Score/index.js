import React from "react";
import ReactStars from "react-stars";
import SkeletonLoader from "../SkeletonLoader";

const Score = ({ rating = 0, handleRatingChange }) => {
    return (
        <div>
            <ReactStars count={5} value={rating} onChange={handleRatingChange} size={24} color2={"#ffd700"} />
        </div>
    );
};

export default Score;
