import React, { useEffect, useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import TextField from "@material-ui/core/TextField";

const RenderList = ({ list }) => {
    // console.log(list);
    // console.log("rendinger ingredients", list);
    return (
        <React.Fragment>
            <List dense={false}>
                {list.map((item, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
        </React.Fragment>
    );
};

export default RenderList;
//<TextField label="Standard" value={item} />
