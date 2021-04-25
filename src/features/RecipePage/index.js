import React, { useEffect, useState } from "react";
import firebase from "../../database/firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import { makeStyles, useTheme } from "@material-ui/core/styles";

import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import InfoIcon from "@material-ui/icons/Info";

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

const RecipePage = () => {
    const [recipe, setRecipe] = useState({});
    const classes = useStyles();
    const [page, setPage] = useState(0);

    useEffect(() => {
        const queryString = window.location.search;
        const urlParams = new URLSearchParams(queryString);

        getRecipe(urlParams.get("id"));
    }, []);

    const getRecipe = async (id) => {
        const recipeRef = firebase.database().ref("recipes");
        const snapshot = await recipeRef.child(id).once("value");
        const value = snapshot.val();
        console.log(value);
        setRecipe(value);
        console.log(value);
    };

    const RenderList = ({ list }) => {
        console.log(list);
        console.log("rendinger ingredients", list);
        return (
            <React.Fragment>
                <List dense={false}>
                    {list.map((step, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={step} />
                        </ListItem>
                    ))}
                </List>
            </React.Fragment>
        );
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
        console.log("page", page);
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
                    console.log("nutritionEntries", nutritionEntries);
                    const nutritionArray = nutritionEntries.map((item) => formatNutrition(item[0]) + ": " + item[1]);

                    console.log("nutritionarray", nutritionArray);
                    return <RenderList list={nutritionArray} />;
                } else {
                    return <h6>Loading Nutrition</h6>;
                }
        }
    };

    return (
        <div>
            {recipe ? recipe.name : null}
            {recipe ? <SwitchPage /> : null}
            <BottomNavigation
                value={page}
                onChange={(event, newValue) => {
                    console.log("newValue", newValue);
                    setPage(newValue);
                }}
                showLabels
                className={classes.root}
            >
                <BottomNavigationAction label="Ingredients" icon={<RestaurantIcon />} />
                <BottomNavigationAction label="Steps" icon={<FormatListNumberedIcon />} />
                <BottomNavigationAction label="Nutrition" icon={<InfoIcon />} />
            </BottomNavigation>
        </div>
    );
};

export default RecipePage;
