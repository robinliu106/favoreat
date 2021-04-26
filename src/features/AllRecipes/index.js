import React, { useEffect, useState } from "react";
import firebase from "../../database/firebase";
import { List, ListItem, ListItemText } from "@material-ui/core";
import Menu from "../Menu";
import Score from "../Score";
const RecipeList = () => {
    const [recipes, setRecipes] = useState();

    useEffect(() => {
        getRecipes();
    }, []);

    const getRecipes = () => {
        const recipeRef = firebase.database().ref("recipes");
        recipeRef.on("value", (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let id in items) {
                items[id].id = id;
                newState.push(items[id]);
            }

            setRecipes(newState);
        });
    };

    const RenderRecipes = () => {
        return (
            <React.Fragment>
                <List dense={false}>
                    {recipes.map((recipe) => (
                        <ListItem
                            button
                            component="a"
                            href={`/recipe?name=${recipe.name}&id=${recipe.id}`}
                            key={recipe.id}
                        >
                            <ListItemText primary={recipe.name} />
                            <Score rating={recipe.rating} edit={false} />
                        </ListItem>
                    ))}
                </List>
            </React.Fragment>
        );
    };
    return (
        <div>
            <Menu />
            {recipes ? <RenderRecipes /> : null}
        </div>
    );
};

export default RecipeList;
