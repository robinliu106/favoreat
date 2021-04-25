import React from "react";

import { Counter } from "./features/counter/Counter";
import AllRecipes from "./features/AllRecipes";
import RecipePage from "./features/RecipePage";

import SearchPage from "./features/SearchPage";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={AllRecipes} />
                    <Route path="/search" component={SearchPage} />
                    <Route path="/recipe" component={RecipePage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
