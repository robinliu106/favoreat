import React, { useEffect, useState } from "react";
import firebase from "../../database/firebase";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
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
                // console.log(id);
                items[id].id = id;
                // console.log(items[id]);

                newState.push(items[id]);
            }

            setRecipes(newState);
        });
    };

    const RenderRecipes = () => {
        // return recipes.map((item) => <h1 key={item.id}>{item.name}</h1>);
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
                            <Score rating={recipe.rating} />
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
