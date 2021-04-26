import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as recipePageSlice from "./recipePageSlice";

import firebase from "../../database/firebase";

import Menu from "../Menu";
import Score from "./Score";
import RenderPage from "./RenderPage";
import BottomNav from "./BottomNav";
import SkeletonLoader from "../SkeletonLoader";

const RecipePage = () => {
    const page = useSelector(recipePageSlice.selectPage);

    const [recipe, setRecipe] = useState({});
    const [id, setID] = useState();

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        let id = urlParams.get("id");
        getRecipe(id);
        setID(id);
    }, []);

    const getRecipe = async (id) => {
        const recipeRef = firebase.database().ref("recipes");
        const snapshot = await recipeRef.child(id).once("value");
        const value = await snapshot.val();
        console.log("get recipe", value);
        setRecipe(value);
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
                    return <RenderPage list={recipe.recipeIngredient} />;
                } else {
                    return <SkeletonLoader />;
                }

            case 1:
                if (recipe.recipeInstructions) {
                    return <RenderPage list={recipe.recipeInstructions} />;
                } else {
                    return <SkeletonLoader />;
                }
            case 2:
                if (recipe.nutrition) {
                    const nutritionEntries = Object.entries(recipe.nutrition);
                    // console.log("nutritionEntries", nutritionEntries);
                    const nutritionArray = nutritionEntries.map((item) => formatNutrition(item[0]) + ": " + item[1]);

                    // console.log("nutritionarray", nutritionArray);
                    return <RenderPage list={nutritionArray} />;
                } else {
                    return <SkeletonLoader />;
                }
        }
    };

    const Page = () => {
        return (
            <div>
                {recipe.name}
                <Score recipe={recipe} id={id} />
                <SwitchPage />
            </div>
        );
    };

    return (
        <div>
            <Menu />
            <Page />
            <BottomNav />
        </div>
    );
};

export default RecipePage;

/*
            {recipe ? <Page /> : <SkeletonLoader />}

{recipe ? recipe.name : null}
            {recipe ?  : null}
            {recipe ?  : null}
*/
