import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import firebase from "./firebase";

// import { fetchCount } from './counterAPI';

const recipeRef = firebase.database().ref("recipes");

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const updateAsync = createAsyncThunk("firebase/updateAsync", async ({ id, key, value }) => {
    console.log("running update async", id, "key", key, "value", value);
    const response = await recipeRef.child(id).update({
        [key]: value,
    });

    return response;
});

export const deleteAsync = createAsyncThunk("firebase/deleteAsync", async ({ id }) => {
    console.log("delete async");
    const response = await recipeRef.child(id).remove(); //firebase.database().collection("recipes").doc(id).delete();
    return response;
});

export const firebaseSlice = createSlice({
    name: "firebase",
    initialState: {
        value: 0,
        status: "idle",
    },
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: {
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value -= 1;
        },
        // Use the PayloadAction type to declare the contents of `action.payload`
        incrementByAmount: (state, action) => {
            state.value += action.payload;
        },
    },
});

export const { increment, decrement, incrementByAmount } = firebaseSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
// export const selectCount = (state) => state.firebase.value;

// // We can also write thunks by hand, which may contain both sync and async logic.
// // Here's an example of conditionally dispatching actions based on current state.
// export const incrementIfOdd = (amount) => (dispatch, getState) => {
//     const currentValue = selectCount(getState());
//     if (currentValue % 2 === 1) {
//         dispatch(incrementByAmount(amount));
//     }
// };

export default firebaseSlice.reducer;
