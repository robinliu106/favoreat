import React from "react";
import ReactStars from "react-stars";

const Score = ({ rating = 0, handleRatingChange, edit = true }) => {
    return (
        <div>
            <ReactStars
                count={5}
                value={rating}
                onChange={handleRatingChange}
                size={24}
                color2={"#ffd700"}
                edit={edit}
            />
        </div>
    );
};

export default Score;
