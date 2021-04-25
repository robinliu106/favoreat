import React from "react";

import { Counter } from "./features/counter/Counter";
import RecipeList from "./features/RecipeList";
import RecipePage from "./features/RecipePage";

import Search from "./features/search";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/" component={RecipeList} />
                    <Route path="/search" component={Search} />
                    <Route path="/recipe" component={RecipePage} />
                </Switch>
            </Router>
        </div>
    );
}

export default App;
