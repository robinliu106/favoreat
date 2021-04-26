import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import FormatListNumberedIcon from "@material-ui/icons/FormatListNumbered";
import RestaurantIcon from "@material-ui/icons/Restaurant";
import InfoIcon from "@material-ui/icons/Info";
import { makeStyles } from "@material-ui/core/styles";

import { useSelector, useDispatch } from "react-redux";
import * as recipePageSlice from "./recipePageSlice";

const useStyles = makeStyles({
    root: {
        width: 500,
    },
});

const BottomNav = () => {
    const dispatch = useDispatch();
    const page = useSelector(recipePageSlice.selectPage);

    const classes = useStyles();

    return (
        <div>
            <BottomNavigation
                value={page}
                onChange={(event, newValue) => {
                    dispatch(recipePageSlice.setPage(newValue));
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

export default BottomNav;
