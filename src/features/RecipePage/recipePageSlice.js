import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    page: 0,
};

export const recipePageSlice = createSlice({
    name: "recipePage",
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        setPage: (state, action) => {
            state.page = action.payload;
        },
    },
});

export const { setPage } = recipePageSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectPage = (state) => state.recipePage.page;

export default recipePageSlice.reducer;
