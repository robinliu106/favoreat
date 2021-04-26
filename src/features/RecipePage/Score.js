import React, { useEffect, useState } from "react";
import ReactStars from "react-stars";
import firebase from "../../database/firebase";

const Score = ({ recipe, id }) => {
    const recipeRef = firebase.database().ref(`/recipes/${id}`);

    const ratingChanged = (newRating) => {
        recipeRef.update({
            rating: newRating,
        });
    };
    return (
        <div>
            {recipe ? (
                <ReactStars count={5} value={recipe.rating} onChange={ratingChanged} size={24} color2={"#ffd700"} />
            ) : (
                "Loading Rating"
            )}
        </div>
    );
};

export default Score;
