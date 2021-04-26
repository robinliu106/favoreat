import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import recipePageReducer from "../features/RecipePage/recipePageSlice";
import firebaseReducer from "../database/firebaseSlice";
const store = configureStore({
    reducer: {
        counter: counterReducer,
        recipePage: recipePageReducer,
        firebase: firebaseReducer,
    },
});

export default store;
