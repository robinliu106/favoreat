import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import firebase from "../../database/firebase";

import RenderList from "./RenderList";
import Menu from "../Menu";

import BottomNav from "./BottomNav";
import * as recipePageSlice from "./recipePageSlice";

const RecipePage = () => {
    const page = useSelector(recipePageSlice.selectPage);

    const [recipe, setRecipe] = useState({});

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        getRecipe(urlParams.get("id"));
    }, []);

    const getRecipe = async (id) => {
        const recipeRef = firebase.database().ref("recipes");
        const snapshot = await recipeRef.child(id).once("value");
        const value = snapshot.val();
        // console.log(value);
        setRecipe(value);
        // console.log(value);
    };

    const formatNutrition = (key) => {
        const nutritionMap = {
            calories: "Calories",
            carbohydrateContent: "Carbohydrate Content",
            cholesterolContent: "Cholesterol Content",
            fatContent: "Fat Content",
            fiberContent: "Fiber Content",
            proteinContent: "Protein Content",
            saturatedFatContent: "Saturated Fat Content",
            servingSize: "Serving Size",
            sodiumContent: "Sodium Content",
            sugarContent: "Sugar Content",
        };

        if (nutritionMap.hasOwnProperty(key)) {
            return nutritionMap[key];
        } else {
            return key;
        }
    };

    const SwitchPage = () => {
        // console.log("page", page);
        switch (parseInt(page)) {
            case 0:
                if (recipe.recipeIngredient) {
                    return <RenderList list={recipe.recipeIngredient} />;
                } else {
                    return <h6>Loading Ingredients</h6>;
                }

            case 1:
                if (recipe.recipeInstructions) {
                    return <RenderList list={recipe.recipeInstructions} />;
                } else {
                    return <h6>Loading Instructions</h6>;
                }
            case 2:
                if (recipe.nutrition) {
                    const nutritionEntries = Object.entries(recipe.nutrition);
                    // console.log("nutritionEntries", nutritionEntries);
                    const nutritionArray = nutritionEntries.map((item) => formatNutrition(item[0]) + ": " + item[1]);

                    // console.log("nutritionarray", nutritionArray);
                    return <RenderList list={nutritionArray} />;
                } else {
                    return <h6>Loading Nutrition</h6>;
                }
        }
    };

    return (
        <div>
            <Menu />
            {recipe ? recipe.name : null}
            {recipe ? <SwitchPage /> : null}
            <BottomNav />
        </div>
    );
};

export default RecipePage;
