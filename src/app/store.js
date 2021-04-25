import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import recipePageReducer from "../features/RecipePage/recipePageSlice";

const store = configureStore({
    reducer: {
        counter: counterReducer,
        recipePage: recipePageReducer,
    },
});

export default store;
