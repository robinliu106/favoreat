import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

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
