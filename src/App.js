import React from "react";

import AllRecipes from "./features/AllRecipes";
import RecipePage from "./features/RecipePage";

import SearchPage from "./features/SearchPage";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
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
};

export default App;
